import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sample, Box, Location, LabelFormat } from '../types';
import { SampleService } from '../services/sample.service';
import { BoxService } from '../services/box.service';
import { LocationService } from '../services/location.service';
import { SoundService } from '../services/sounds.service';
import { GlobalsService } from '../services/global.service';

import 'rxjs/add/operator/switchMap';
import * as _ from 'underscore';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
//import { AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    templateUrl: '../../Templates/pack-box-samples.component.html'
})

export class PackBoxComponent implements OnInit {
    @ViewChild('moveBoxModal') moveBoxModal: any;
    @ViewChild('setFixedBoxDestintationModal') setFixedBoxDestintationModal: any;
    @ViewChild('despatchLocationNotSelectedModal') despatchLocationNotSelectedModal: any;
    @ViewChild('labno') el: ElementRef;
    sampleTypes: string[] = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
    samples: Sample[];
    despatchLocations: Location[];
    allLocations: Location[];
    childBoxDespatchLocation: Location;
    childBoxes: Box[];
    box: Box;
    fixedBoxId: number;
    newBox: Box; //box created on fly, from fixed box.
    postInProgress: boolean = false;
    despatchLocation: Location;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sampleService: SampleService,
        private boxService: BoxService,
        private locationService: LocationService,
        private soundService: SoundService,
        private globalsService: GlobalsService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    getXHRData(boxid: number): void {
        Observable.forkJoin(
            this.sampleService.getSamplesByBoxId(boxid),
            this.boxService.getChildBoxes(boxid),
            this.boxService.getBoxByBoxId(boxid),
            this.locationService.getAllSiteLocations(),
            this.locationService.getDespatchLoctions()
        )
            .subscribe(res => {
                this.samples = res[0]
                this.childBoxes = res[1]
                let box = res[2]
                this.allLocations = _.flatten(_.map(res[3], (s => s.Locations)))
                let emptyLoc: Location = {
                    LocationId: -1,
                    Name: '*select despatch location*',
                    PrinterIp: '',
                    LabelFormat: null,
                    editable: false
                };
                let despatchlocs = (res[4]).concat(emptyLoc);
                this.despatchLocations = _.sortBy(despatchlocs, (l => l.Name));
                box.Event = 'Started packing @ ' + this.globalsService.Context.Location;
                switch (box.Status) {
                    case 'Unpacked':
                        box.Status = 'BeingPacked';
                        box.LastLocation = _.find(this.allLocations, (l => l.LocationId == this.globalsService.Context.LocationId));
                        this.boxService.saveBox(box).subscribe(b => {
                            this.box = b;
                            this.toastr.success(box.Description + ' status & location updated'), err => this.toastr.error(err, 'Oh No!')
                        });
                        break;
                    case 'BeingPacked':
                        //case 'Despatched':
                        console.log(this.globalsService.Context.LocationId, box.LastLocation, _.isEqual(box.LastLocation.LocationId, this.globalsService.Context.LocationId))
                        if (box.LastLocation.LocationId == this.globalsService.Context.LocationId) {
                            box.Status = 'BeingPacked';
                            box.LastLocation = _.find(this.allLocations, (l => l.LocationId == this.globalsService.Context.LocationId));
                            this.boxService.saveBox(box).subscribe(b => {
                                this.box = b;
                                this.toastr.success(box.Description + ' status updated'), err => this.toastr.error(err, 'Oh dear!')
                            });
                        }
                        else {
                            this.box = box;
                            this.moveBoxModal.show();
                        }
                        break;
                    default: //Intransit, Received, BeingUnPacked
                        this.soundService.beep('bong');
                        this.toastr.error(box.Description + ' is in ' + box.Status + ' status.', 'Wrong status!', { dismiss: 'controlled' })
                            .then((toast: Toast) => {
                                setTimeout(() => {
                                    this.toastr.dismissToast(toast);
                                    this.router.navigate(['/pack']);
                                }, 2000);
                            });
                        break;
                }
            },
                err =>
                    this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
                        .then((toast: Toast) => {
                            setTimeout(() => {
                                this.toastr.dismissToast(toast);
                                this.router.navigate(['/pack']);
                            }, 2000);
                        })
            )
    }

    labnoScanned(event: any) {
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            switch (entry.startsWith('BOX')) {
                //this is a box.
                case true:
                    let boxId = +entry.replace('BOX', '');
                    if (boxId === this.box.BoxId) {
                        this.toastr.error('You can\'t pack a box in itself!', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    if (this.box.BoxType === "Fixed Box") {
                        this.toastr.error('You can\'t pack a box in a fixed box', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    if (_.find(this.childBoxes, (box) => box.BoxId === boxId)) {
                        this.toastr.error('That box is already packed!', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    else {
                        this.boxService.getBoxByBoxId(boxId)
                            .subscribe(box => {
                                console.log(box.BoxType);
                                var newbox = box;
                                var childBoxTransient = false;
                                switch (box.BoxType) {
                                    case 'Fixed Box':

                                        //create a box on the fly,
                                        this.fixedBoxId = boxId;
                                        childBoxTransient = true; //flag to indicate this child box is a transient one.
                                        newbox = {
                                            ParentBoxId: this.box.BoxId,
                                            BoxId: -1,
                                            BoxType: 'Transient Box',
                                            Description: box.Description,
                                            LastLocation: box.LastLocation,
                                            Destination: box.Destination,
                                            LastMoved: new Date(),
                                            User: box.User,
                                            Status: 'BeingPacked',
                                            Event: "Packed in " + this.box.Description,
                                            TrackingAuditId: box.TrackingAuditId,
                                            editable: true
                                        }
                                        this.newBox = newbox;
                                        this.setFixedBoxDestintationModal.show();
                                        break;

                                    default:
                                        //pack the new box in the parent
                                        newbox.ParentBoxId = this.box.BoxId;
                                        newbox.Status = 'BeingPacked'; // ? or perhaps straight to Despatched
                                        newbox.Event = "Packed in " + this.box.Description
                                        newbox.LastLocation = _.find(this.allLocations, (l => l.LocationId === this.globalsService.Context.LocationId));
                                        this.boxService.packChildBox(newbox).subscribe(newBoxId => {
                                            /*
                                            if (childBoxTransient) {
                                              this.boxService.moveBoxSamples(boxId, newBoxId)
                                                .subscribe(
                                                  resp => {
                                                    //console.log(resp)
                                                    newbox.BoxId = newBoxId
                                                    this.boxService.printLabel(newBoxId)
                                                      .subscribe(box => {
                                                        console.log(box)
                                                      },
                                                        err => this.toastr.error("No label printer", "box id is " + err)
                                                      )
                                                  },
                                                  err => console.log(err)
                                                )
                                            }
                                            */
                                            this.childBoxes.push(newbox);
                                            this.toastr.success("box " + newbox.Description + " added.", "Success!");
                                            this.soundService.beep('beep');
                                        },
                                            (err) => {
                                                console.log(err);
                                                this.toastr.error(err._body, 'Nooooo!');
                                                this.soundService.beep('bong');
                                            });
                                        break;
                                }
                            },
                                (err) => {
                                    this.toastr.error(err, 'Nooooo!');
                                    this.soundService.beep('bong');
                                    event.target.value = '';
                                    this.postInProgress = false;
                                },
                                () => {
                                    event.target.value = '';
                                    this.postInProgress = false;
                                }
                            );
                        console.log(this.childBoxes);
                    }
                    break;
                //a sample.
                default:
                    let labno = '';
                    let smptypID = 0;
                    //convert to switch
                    if (entry.length == 10) {
                        labno = entry.substr(0, 9);
                        var suffix = entry.substr(9, 1);
                        smptypID = isNaN(parseInt(suffix)) ? '9' : suffix;
                    }
                    if (entry.length <= 9) {
                        labno = entry.toUpperCase();
                    }
                    if (entry.length > 10) {
                        labno = entry.toUpperCase();
                        smptypID = 9;
                    }
                    console.log(this.box)
                    let sample = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: 0, Col: 0, BoxId: this.box.BoxId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), TrackingAuditId: this.box.TrackingAuditId, Event: 'Packed in ' + this.box.Description + ' @ ' + this.globalsService.Context.Location }

                    this.sampleService.saveSample(sample)
                        .subscribe(
                            id => {
                                sample.SampleId = id;
                                this.samples = this.samples.concat(sample);
                                event.target.value = '';
                                this.postInProgress = false;
                                this.soundService.beep('beep');
                                this.toastr.success(sample.SampleNo + ' packed!', 'Success!');
                            },
                            (err) => {
                                this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                                this.soundService.beep('bong');
                                event.target.value = '';
                                this.postInProgress = false;
                            }
                        )
                    break;
            }
        }
        else {
            this.soundService.beep('bong');
        }
        let a = this.el.nativeElement;
        a.focus();
    }

    onDestinationChanged(event: any) {
        //console.log(event.target.value);
        this.despatchLocation = _.find(this.despatchLocations, (l => l.LocationId == event.target.value));
    }

    onChildBoxDestinationChanged(event: any) {
        this.childBoxDespatchLocation = _.find(this.despatchLocations, (l => l.LocationId == event.target.value));
    }

    samplesChanged(evt: Sample): void {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = _.without(this.samples, evt);
        //if there's no samples left, reset the current Pos to {1,0}
    }

    boxesChanged(evt: Box): void {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = _.without(this.childBoxes, evt);
    }

    navigateToParent(): void {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/packsamples', +this.box.ParentBoxId]);
    }

    checkEmptyUpdateStatus(): void {
        //check if empty
        console.log('checking empty ...', this.samples, this.childBoxes, this.box);
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.boxService.saveBox(this.box).subscribe(
                box => {
                    this.box = box;
                    this.toastr.info(' box empty', 'Success!', { dismiss: 'controlled' })
                        .then((toast: Toast) => {
                            setTimeout(() => {
                                this.toastr.dismissToast(toast);
                                this.router.navigate(['/unpack'])
                            }, 2000);
                        })
                });
        }
    }

    despatchBox(): void {
        if (this.despatchLocation == undefined) {
            this.despatchLocationNotSelectedModal.show();
            //this.despatchLocation = this.locations[0];
        }
        else {
            if (this.samples.length > 0 || this.childBoxes.length > 0) {
                this.box.Destination = this.despatchLocation;
                this.box.Status = 'Despatched';//?In transit
                this.box.Event = 'Despatched from ' + this.box.LastLocation.Name + ' to ' + this.despatchLocation.Name;
                //update for all child boxes. ???? and all the boxes inside the boxes, recursively. Prolly better to do this on the server
                console.log(this.box);
                this.boxService.saveBox(this.box)
                    .subscribe(box => {
                        this.box = box;
                        this.soundService.beep('beep');
                        this.router.navigate(['/pack']);
                    });
            }
            else {
                this.toastr.error('... to depatch.', 'There is nowt ...');
            }
        }
    }

    moveBoxModalHandler(modal: any, yesno: number): void {
        console.log(yesno);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/pack']);
                break;
            case 1:
                this.box.LastLocation = _.find(this.allLocations, (l => l.LocationId == this.globalsService.Context.LocationId));
                this.box.Status = 'BeingPacked';
                //this.globalsService.Location;
                this.boxService.saveBox(this.box)
                    .subscribe(b => {
                        this.box = b;
                        this.toastr.success(this.box.Description + ' status & location updated');
                    }, err => {
                        this.toastr.error(err, 'Oh dear!')
                    }, () => modal.hide()
                    );
                break;
            default:
                break;
        }
    }

    setFixedBoxDestintationModalHandler(modal: any): void {
        this.newBox.Destination = this.childBoxDespatchLocation;
        this.boxService.packChildBox(this.newBox).subscribe(newBoxId => {
            //if (childBoxTransient) {
            this.boxService.moveBoxSamples(this.fixedBoxId, newBoxId)
                .subscribe(
                    resp => {
                        //console.log(resp)
                        this.newBox.BoxId = newBoxId
                        this.boxService.printLabel(newBoxId)
                            .subscribe(box => {
                                console.log(box)
                            },
                                err => this.toastr.error("No label printer", "box id is " + err)
                            )
                    },
                    err => console.log(err)
                )
            //}
            this.childBoxes.push(this.newBox);
            this.toastr.success("box " + this.newBox.Description + " added.", "Success!");
            this.soundService.beep('beep');
            let a = this.el.nativeElement;
            a.focus();
        },
            (err) => {
                console.log(err);
                this.toastr.error(err._body, 'Nooooo!');
                this.soundService.beep('bong');
            });
        modal.hide();
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                let a = this.el.nativeElement;
                a.focus();
                if (params['id'] == undefined) { }
                else {
                    this.getXHRData(+params['id']);
                }
            });
    }
}
