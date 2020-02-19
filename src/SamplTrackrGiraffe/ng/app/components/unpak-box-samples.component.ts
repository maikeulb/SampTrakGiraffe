import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sample, Box, Location, Site } from '../types';
import { SampleService } from '../services/sample.service';
import { BoxService } from '../services/box.service';
import { LocationService } from '../services/location.service';
import { SoundService } from '../services/sounds.service';
import { GlobalsService } from '../services/global.service';

import 'rxjs/add/operator/switchMap';
import * as _ from 'underscore';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    templateUrl: '../../Templates/unpack-box-samples.component.html'
})

export class UnPackBoxComponent implements OnInit {
    @ViewChild('moveBoxModal') moveBoxModal: any;
    @ViewChild('unpackAnywayModal') unpackAnywayModal: any;
    @ViewChild('labno') el: ElementRef;
    sampleTypes: string[] = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
    samples: Sample[];
    locations: Location[];
    childBoxes: Box[];
    box: Box;
    postInProgress: boolean = false;
    contextSample: Sample
    //despatchLocation: Location;

    //@ViewChild('despatchLocation') despatchLocation: ElementRef;
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

    getBoxAndContents(boxid: number): void {
        Observable.forkJoin(
            this.sampleService.getSamplesByBoxId(boxid),
            this.boxService.getChildBoxes(boxid),
            this.boxService.getBoxByBoxId(boxid),
            this.locationService.getAllSiteLocations()
        )
            .subscribe(res => {
                this.samples = res[0];
                this.childBoxes = res[1];
                let box = res[2];
                this.locations = _.flatten(_.map(res[3], (s => s.Locations)));
                box.Event = 'Started unpacking @ ' + this.globalsService.Context.Location;
                switch (box.Status) {
                    case 'InTransit':
                    case 'Despatched':
                    case 'Received':
                    case 'BeingUnpacked':
                    case 'Delivered':
                        //if box.Destination == here then
                        if (box.Destination.LocationId == this.globalsService.Context.LocationId) {
                            box.Status = 'BeingUnpacked';
                            this.boxService.saveBox(box).subscribe(b => this.toastr.success(box.Description + ' status updated'), err => this.toastr.error(err, 'Badness!'));
                            this.box = box;
                        }
                        else {
                            this.box = box;
                            this.moveBoxModal.show();
                        }
                        break;
                    case 'BeingPacked':
                        if (box.BoxType === 'Fixed Box' || box.BoxType === 'Transient Box') {
                            //this.box = box;
                            //_.each(this.samples, s => {
                            //  let suffix = s.SampTypeSuffix === 0 ? '' : s.SampTypeSuffix;
                            //  this.unpackSample(s.SampleNo + suffix);
                            //})
                            this.toastr.info('Fixed Box!', 'Not unpacked', { dismiss: 'controlled' })
                                .then((toast: Toast) => {
                                    setTimeout(() => {
                                        this.toastr.dismissToast(toast);
                                        this.router.navigate(['/unpack'])
                                    }, 2000);
                                });
                        }
                        else {
                            this.toastr.info('This box is still being packed', 'Not unpacked', { dismiss: 'controlled' })
                                .then((toast: Toast) => {
                                    setTimeout(() => {
                                        this.toastr.dismissToast(toast);
                                        this.router.navigate(['/unpack'])
                                    }, 2000);
                                });
                        }
                        break;
                    default:
                        this.toastr.info('This box is @ status ' + box.Status, 'Wrong Status!', { dismiss: 'controlled' })
                            .then((toast: Toast) => {
                                setTimeout(() => {
                                    this.toastr.dismissToast(toast);
                                    this.router.navigate(['/unpack'])
                                }, 2000);
                            });
                        break;
                }
            },
                err => this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                        setTimeout(() => {
                            this.toastr.dismissToast(toast);
                            this.router.navigate(['/unpack'])
                        }, 2000);

                    }),
                () => this.checkEmptyUpdateStatus()
            )
    }

    unpackSample(entry: string) {

        switch (entry.startsWith('BOX')) {
            case true:
                let boxId = entry.replace('BOX', '');
                let box = _.find(this.childBoxes, (b => b.BoxId === +boxId))
                if (box === undefined) {
                    this.toastr.error('Box with id ' + boxId.toString() + ' not found', 'Wrong!'); //unpacking a box that is not here, disallowed
                }

                else {
                    box.ParentBoxId = null;
                    box.Status = 'Received';
                    box.Event = 'Unpacked from ' + this.box.Description;
                    this.boxService.saveBox(box).subscribe(() => {
                        this.childBoxes = _.without(this.childBoxes, box);
                        this.toastr.success("box " + box.Description + " received", "Success!");
                        this.soundService.beep('beep');
                    },
                        (err) => {
                            this.toastr.error(err, 'Nooooo!');
                            this.soundService.beep('bong');
                        },
                        () => this.checkEmptyUpdateStatus()
                    )
                }
                /* event.target.value = '';
                this.postInProgress = false; */
                break;
            default:
                this.setContextSample(entry);
                let sample = _.find(this.samples, (s => s.SampleNo === this.contextSample.SampleNo && s.SampTypeSuffix === this.contextSample.SampTypeSuffix));
                if (sample === undefined) {
                    //modal 'Not found, do you want to unpack anyway?'
                    this.unpackAnywayModal.show();
                }
                else {
                    console.log(this.box);
                    sample.Event = 'Unpacked from ' + this.box.Description + ' @ ' + this.box.Destination.Name;
                    this.sampleService.saveSample(sample)
                        .subscribe(
                            id => {
                                sample.SampleId = id;
                                this.samples = _.without(this.samples, sample);
                                this.sampleService.destroySample(sample)
                                    .subscribe(s => {
                                        this.soundService.beep('beep');
                                        this.toastr.success(sample.SampleNo + ' unpacked!', 'Success!');
                                    },
                                        (err) => {
                                            this.toastr.error(err, 'Oh No!');
                                            this.soundService.beep('bong');
                                        },
                                        () => this.checkEmptyUpdateStatus()
                                    )
                            },
                            (err) => {
                                this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                                this.soundService.beep('bong');
                            })
                }
                break;
        }
    }

    labnoScanned(event: any) {
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            this.unpackSample(entry)
            event.target.value = '';
            event.target.focus();
            this.postInProgress = false;
        }
        else {
            this.soundService.beep('bong');
            event.target.value = '';
            event.target.focus();
        }
        let a = this.el.nativeElement;
        a.focus();
    }

    setContextSample(entry: string) {
        let labno = '';
        let smptypID = 0;
        if (entry.length === 10) {
            labno = entry.substr(0, 9);
            var suffix = entry.substr(9, 1);
            smptypID = isNaN(parseInt(suffix)) ? 9 : parseInt(suffix);
        }

        if (entry.length <= 9) {
            labno = entry.toUpperCase();
        }

        if (entry.length > 10) {
            labno = entry.toUpperCase();
            smptypID = 9;
        }

        this.contextSample = {
            SampleId: 0,
            SampleNo: labno,
            SampTypeSuffix: smptypID,
            Row: 0,
            Col: 0,
            SampleType: '',
            DateTime: new Date(),
            TrackingAuditId: '',
            Event: ''
        }
        console.log(this.contextSample);
    }

    navigateToParent(): void {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/unpacksamples', +this.box.ParentBoxId]);
    }

    checkEmptyUpdateStatus(): void {
        //check if empty
        //console.log('checking empty ...');
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.box.Event = 'Unpacked & empty @ ' + this.globalsService.Context.Location;
            this.boxService.saveBox(this.box).subscribe(
                id => this.toastr.info('box empty', 'Success!', { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                        setTimeout(() => {
                            this.toastr.dismissToast(toast);
                            this.router.navigate(['/unpack'])
                        }, 2000);
                    })
            )
        }
    }

    samplesChanged(evt: Sample): void {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = _.without(this.samples, evt)
        this.checkEmptyUpdateStatus();
    }

    unpackEverything(): void {
        console.log('unpack owt');
    }

    boxesChanged(evt: Box): void {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = _.without(this.childBoxes, evt);
        this.checkEmptyUpdateStatus();
    }

    moveBoxModalHandler(modal: any, yesno: number): void {
        console.log('move box', this.locations);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/unpack']);
                break;
            case 1:
                let l = _.find(this.locations, (l => l.LocationId == this.globalsService.Context.LocationId));
                console.log(l);
                this.box.LastLocation = _.find(this.locations, (l => l.LocationId == this.globalsService.Context.LocationId));
                this.box.Destination = _.find(this.locations, (l => l.LocationId == this.globalsService.Context.LocationId));
                this.box.Status = 'BeingUnpacked';
                this.boxService.saveBox(this.box)
                    .subscribe(b => {
                        this.toastr.success(this.box.Description + ' status & location updated');
                    }, err => {
                        this.toastr.error(err, 'Oh dear!')
                    }, () => modal.hide()
                );
                let a = this.el.nativeElement;
                a.focus();
                break;
            default:
                modal.hide();
                break;
        }
    }

    unpackAnywayModalHandler(modal: any, yesno: number) {
        switch (yesno) {
            case 0:
                modal.hide();
                //this.router.navigate(['/unpack']);
                break;
            case 1:
                //get sample, update (flatMap) location, event etc., destroy.
                let sample = {
                    SampleId: 0,
                    SampleNo: this.contextSample.SampleNo,
                    SampTypeSuffix: this.contextSample.SampTypeSuffix,
                    BoxId: this.box.BoxId,
                    Row: 0,
                    Col: 0, SampleType: this.sampleTypes[this.contextSample.SampTypeSuffix],
                    DateTime: new Date(),
                    TrackingAuditId: '',
                    Event: 'unpacked from ' + this.box.Description + ' @ ' + (new Date()).toShortDateTimeString() + ' in ' + this.globalsService.Context.Location
                }
                this.sampleService.saveSample(sample)
                    .subscribe(smp => {
                        this.sampleService.destroySampleById(smp).subscribe(smp => smp, err => console.log(err));
                        this.toastr.success(sample.SampleNo + ' unpacked!', 'Success!');
                    },
                        err => console.log(err),
                        () => modal.hide()
                    );
                break;
            default:
                modal.hide();
                break;
        }
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                let a = this.el.nativeElement;
                a.focus();
                if (params['id'] == undefined) { }
                else {
                    this.getBoxAndContents(+params['id']);
                }
            });
    }
}
