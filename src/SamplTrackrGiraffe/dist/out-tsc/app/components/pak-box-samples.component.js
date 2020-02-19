"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sample_service_1 = require("../services/sample.service");
var box_service_1 = require("../services/box.service");
var location_service_1 = require("../services/location.service");
var sounds_service_1 = require("../services/sounds.service");
var global_service_1 = require("../services/global.service");
require("rxjs/add/operator/switchMap");
var _ = require("underscore");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
//import { AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
var Observable_1 = require("rxjs/Observable");
var PackBoxComponent = /** @class */ (function () {
    function PackBoxComponent(route, router, sampleService, boxService, locationService, soundService, globalsService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.boxService = boxService;
        this.locationService = locationService;
        this.soundService = soundService;
        this.globalsService = globalsService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.sampleTypes = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
        this.postInProgress = false;
        this.toastr.setRootViewContainerRef(vcr);
    }
    PackBoxComponent.prototype.getXHRData = function (boxid) {
        var _this = this;
        Observable_1.Observable.forkJoin(this.sampleService.getSamplesByBoxId(boxid), this.boxService.getChildBoxes(boxid), this.boxService.getBoxByBoxId(boxid), this.locationService.getAllSiteLocations(), this.locationService.getDespatchLoctions())
            .subscribe(function (res) {
            _this.samples = res[0];
            _this.childBoxes = res[1];
            var box = res[2];
            _this.allLocations = _.flatten(_.map(res[3], (function (s) { return s.Locations; })));
            var emptyLoc = {
                LocationId: -1,
                Name: '*select despatch location*',
                PrinterIp: '',
                LabelFormat: null,
                editable: false
            };
            var despatchlocs = (res[4]).concat(emptyLoc);
            _this.despatchLocations = _.sortBy(despatchlocs, (function (l) { return l.Name; }));
            box.Event = 'Started packing @ ' + _this.globalsService.Context.Location;
            switch (box.Status) {
                case 'Unpacked':
                    box.Status = 'BeingPacked';
                    box.LastLocation = _.find(_this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                    _this.boxService.saveBox(box).subscribe(function (b) {
                        _this.box = b;
                        _this.toastr.success(box.Description + ' status & location updated'), function (err) { return _this.toastr.error(err, 'Oh No!'); };
                    });
                    break;
                case 'BeingPacked':
                    //case 'Despatched':
                    console.log(_this.globalsService.Context.LocationId, box.LastLocation, _.isEqual(box.LastLocation.LocationId, _this.globalsService.Context.LocationId));
                    if (box.LastLocation.LocationId == _this.globalsService.Context.LocationId) {
                        box.Status = 'BeingPacked';
                        box.LastLocation = _.find(_this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                        _this.boxService.saveBox(box).subscribe(function (b) {
                            _this.box = b;
                            _this.toastr.success(box.Description + ' status updated'), function (err) { return _this.toastr.error(err, 'Oh dear!'); };
                        });
                    }
                    else {
                        _this.box = box;
                        _this.moveBoxModal.show();
                    }
                    break;
                default: //Intransit, Received, BeingUnPacked
                    _this.soundService.beep('bong');
                    _this.toastr.error(box.Description + ' is in ' + box.Status + ' status.', 'Wrong status!', { dismiss: 'controlled' })
                        .then(function (toast) {
                        setTimeout(function () {
                            _this.toastr.dismissToast(toast);
                            _this.router.navigate(['/pack']);
                        }, 2000);
                    });
                    break;
            }
        }, function (err) {
            return _this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/pack']);
                }, 2000);
            });
        });
    };
    PackBoxComponent.prototype.labnoScanned = function (event) {
        var _this = this;
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            switch (entry.startsWith('BOX')) {
                //this is a box.
                case true:
                    var boxId_1 = +entry.replace('BOX', '');
                    if (boxId_1 === this.box.BoxId) {
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
                    if (_.find(this.childBoxes, function (box) { return box.BoxId === boxId_1; })) {
                        this.toastr.error('That box is already packed!', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    else {
                        this.boxService.getBoxByBoxId(boxId_1)
                            .subscribe(function (box) {
                            console.log(box.BoxType);
                            var newbox = box;
                            var childBoxTransient = false;
                            switch (box.BoxType) {
                                case 'Fixed Box':
                                    //create a box on the fly,
                                    _this.fixedBoxId = boxId_1;
                                    childBoxTransient = true; //flag to indicate this child box is a transient one.
                                    newbox = {
                                        ParentBoxId: _this.box.BoxId,
                                        BoxId: -1,
                                        BoxType: 'Transient Box',
                                        Description: box.Description,
                                        LastLocation: box.LastLocation,
                                        Destination: box.Destination,
                                        LastMoved: new Date(),
                                        User: box.User,
                                        Status: 'BeingPacked',
                                        Event: "Packed in " + _this.box.Description,
                                        TrackingAuditId: box.TrackingAuditId,
                                        editable: true
                                    };
                                    _this.newBox = newbox;
                                    _this.setFixedBoxDestintationModal.show();
                                    break;
                                default:
                                    //pack the new box in the parent
                                    newbox.ParentBoxId = _this.box.BoxId;
                                    newbox.Status = 'BeingPacked'; // ? or perhaps straight to Despatched
                                    newbox.Event = "Packed in " + _this.box.Description;
                                    newbox.LastLocation = _.find(_this.allLocations, (function (l) { return l.LocationId === _this.globalsService.Context.LocationId; }));
                                    _this.boxService.packChildBox(newbox).subscribe(function (newBoxId) {
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
                                        _this.childBoxes.push(newbox);
                                        _this.toastr.success("box " + newbox.Description + " added.", "Success!");
                                        _this.soundService.beep('beep');
                                    }, function (err) {
                                        console.log(err);
                                        _this.toastr.error(err._body, 'Nooooo!');
                                        _this.soundService.beep('bong');
                                    });
                                    break;
                            }
                        }, function (err) {
                            _this.toastr.error(err, 'Nooooo!');
                            _this.soundService.beep('bong');
                            event.target.value = '';
                            _this.postInProgress = false;
                        }, function () {
                            event.target.value = '';
                            _this.postInProgress = false;
                        });
                        console.log(this.childBoxes);
                    }
                    break;
                //a sample.
                default:
                    var labno = '';
                    var smptypID = 0;
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
                    console.log(this.box);
                    var sample_1 = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: 0, Col: 0, BoxId: this.box.BoxId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), TrackingAuditId: this.box.TrackingAuditId, Event: 'Packed in ' + this.box.Description + ' @ ' + this.globalsService.Context.Location };
                    this.sampleService.saveSample(sample_1)
                        .subscribe(function (id) {
                        sample_1.SampleId = id;
                        _this.samples = _this.samples.concat(sample_1);
                        event.target.value = '';
                        _this.postInProgress = false;
                        _this.soundService.beep('beep');
                        _this.toastr.success(sample_1.SampleNo + ' packed!', 'Success!');
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                        _this.soundService.beep('bong');
                        event.target.value = '';
                        _this.postInProgress = false;
                    });
                    break;
            }
        }
        else {
            this.soundService.beep('bong');
        }
        var a = this.el.nativeElement;
        a.focus();
    };
    PackBoxComponent.prototype.onDestinationChanged = function (event) {
        //console.log(event.target.value);
        this.despatchLocation = _.find(this.despatchLocations, (function (l) { return l.LocationId == event.target.value; }));
    };
    PackBoxComponent.prototype.onChildBoxDestinationChanged = function (event) {
        this.childBoxDespatchLocation = _.find(this.despatchLocations, (function (l) { return l.LocationId == event.target.value; }));
    };
    PackBoxComponent.prototype.samplesChanged = function (evt) {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = _.without(this.samples, evt);
        //if there's no samples left, reset the current Pos to {1,0}
    };
    PackBoxComponent.prototype.boxesChanged = function (evt) {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = _.without(this.childBoxes, evt);
    };
    PackBoxComponent.prototype.navigateToParent = function () {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/packsamples', +this.box.ParentBoxId]);
    };
    PackBoxComponent.prototype.checkEmptyUpdateStatus = function () {
        var _this = this;
        //check if empty
        console.log('checking empty ...', this.samples, this.childBoxes, this.box);
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.boxService.saveBox(this.box).subscribe(function (box) {
                _this.box = box;
                _this.toastr.info(' box empty', 'Success!', { dismiss: 'controlled' })
                    .then(function (toast) {
                    setTimeout(function () {
                        _this.toastr.dismissToast(toast);
                        _this.router.navigate(['/unpack']);
                    }, 2000);
                });
            });
        }
    };
    PackBoxComponent.prototype.despatchBox = function () {
        var _this = this;
        if (this.despatchLocation == undefined) {
            this.despatchLocationNotSelectedModal.show();
            //this.despatchLocation = this.locations[0];
        }
        else {
            if (this.samples.length > 0 || this.childBoxes.length > 0) {
                this.box.Destination = this.despatchLocation;
                this.box.Status = 'Despatched'; //?In transit
                this.box.Event = 'Despatched from ' + this.box.LastLocation.Name + ' to ' + this.despatchLocation.Name;
                //update for all child boxes. ???? and all the boxes inside the boxes, recursively. Prolly better to do this on the server
                console.log(this.box);
                this.boxService.saveBox(this.box)
                    .subscribe(function (box) {
                    _this.box = box;
                    _this.soundService.beep('beep');
                    _this.router.navigate(['/pack']);
                });
            }
            else {
                this.toastr.error('... to depatch.', 'There is nowt ...');
            }
        }
    };
    PackBoxComponent.prototype.moveBoxModalHandler = function (modal, yesno) {
        var _this = this;
        console.log(yesno);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/pack']);
                break;
            case 1:
                this.box.LastLocation = _.find(this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Status = 'BeingPacked';
                //this.globalsService.Location;
                this.boxService.saveBox(this.box)
                    .subscribe(function (b) {
                    _this.box = b;
                    _this.toastr.success(_this.box.Description + ' status & location updated');
                }, function (err) {
                    _this.toastr.error(err, 'Oh dear!');
                }, function () { return modal.hide(); });
                break;
            default:
                break;
        }
    };
    PackBoxComponent.prototype.setFixedBoxDestintationModalHandler = function (modal) {
        var _this = this;
        this.newBox.Destination = this.childBoxDespatchLocation;
        this.boxService.packChildBox(this.newBox).subscribe(function (newBoxId) {
            //if (childBoxTransient) {
            _this.boxService.moveBoxSamples(_this.fixedBoxId, newBoxId)
                .subscribe(function (resp) {
                //console.log(resp)
                _this.newBox.BoxId = newBoxId;
                _this.boxService.printLabel(newBoxId)
                    .subscribe(function (box) {
                    console.log(box);
                }, function (err) { return _this.toastr.error("No label printer", "box id is " + err); });
            }, function (err) { return console.log(err); });
            //}
            _this.childBoxes.push(_this.newBox);
            _this.toastr.success("box " + _this.newBox.Description + " added.", "Success!");
            _this.soundService.beep('beep');
            var a = _this.el.nativeElement;
            a.focus();
        }, function (err) {
            console.log(err);
            _this.toastr.error(err._body, 'Nooooo!');
            _this.soundService.beep('bong');
        });
        modal.hide();
    };
    PackBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var a = _this.el.nativeElement;
            a.focus();
            if (params['id'] == undefined) { }
            else {
                _this.getXHRData(+params['id']);
            }
        });
    };
    __decorate([
        core_1.ViewChild('moveBoxModal'),
        __metadata("design:type", Object)
    ], PackBoxComponent.prototype, "moveBoxModal", void 0);
    __decorate([
        core_1.ViewChild('setFixedBoxDestintationModal'),
        __metadata("design:type", Object)
    ], PackBoxComponent.prototype, "setFixedBoxDestintationModal", void 0);
    __decorate([
        core_1.ViewChild('despatchLocationNotSelectedModal'),
        __metadata("design:type", Object)
    ], PackBoxComponent.prototype, "despatchLocationNotSelectedModal", void 0);
    __decorate([
        core_1.ViewChild('labno'),
        __metadata("design:type", core_1.ElementRef)
    ], PackBoxComponent.prototype, "el", void 0);
    PackBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/pack-box-samples.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            sample_service_1.SampleService,
            box_service_1.BoxService,
            location_service_1.LocationService,
            sounds_service_1.SoundService,
            global_service_1.GlobalsService,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], PackBoxComponent);
    return PackBoxComponent;
}());
exports.PackBoxComponent = PackBoxComponent;
//# sourceMappingURL=pak-box-samples.component.js.map