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
var Observable_1 = require("rxjs/Observable");
var UnPackBoxComponent = /** @class */ (function () {
    //despatchLocation: Location;
    //@ViewChild('despatchLocation') despatchLocation: ElementRef;
    function UnPackBoxComponent(route, router, sampleService, boxService, locationService, soundService, globalsService, toastr, vcr) {
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
    UnPackBoxComponent.prototype.getBoxAndContents = function (boxid) {
        var _this = this;
        Observable_1.Observable.forkJoin(this.sampleService.getSamplesByBoxId(boxid), this.boxService.getChildBoxes(boxid), this.boxService.getBoxByBoxId(boxid), this.locationService.getAllSiteLocations())
            .subscribe(function (res) {
            _this.samples = res[0];
            _this.childBoxes = res[1];
            var box = res[2];
            _this.locations = _.flatten(_.map(res[3], (function (s) { return s.Locations; })));
            box.Event = 'Started unpacking @ ' + _this.globalsService.Context.Location;
            switch (box.Status) {
                case 'InTransit':
                case 'Despatched':
                case 'Received':
                case 'BeingUnpacked':
                case 'Delivered':
                    //if box.Destination == here then
                    if (box.Destination.LocationId == _this.globalsService.Context.LocationId) {
                        box.Status = 'BeingUnpacked';
                        _this.boxService.saveBox(box).subscribe(function (b) { return _this.toastr.success(box.Description + ' status updated'); }, function (err) { return _this.toastr.error(err, 'Badness!'); });
                        _this.box = box;
                    }
                    else {
                        _this.box = box;
                        _this.moveBoxModal.show();
                    }
                    break;
                case 'BeingPacked':
                    if (box.BoxType === 'Fixed Box' || box.BoxType === 'Transient Box') {
                        //this.box = box;
                        //_.each(this.samples, s => {
                        //  let suffix = s.SampTypeSuffix === 0 ? '' : s.SampTypeSuffix;
                        //  this.unpackSample(s.SampleNo + suffix);
                        //})
                        _this.toastr.info('Fixed Box!', 'Not unpacked', { dismiss: 'controlled' })
                            .then(function (toast) {
                            setTimeout(function () {
                                _this.toastr.dismissToast(toast);
                                _this.router.navigate(['/unpack']);
                            }, 2000);
                        });
                    }
                    else {
                        _this.toastr.info('This box is still being packed', 'Not unpacked', { dismiss: 'controlled' })
                            .then(function (toast) {
                            setTimeout(function () {
                                _this.toastr.dismissToast(toast);
                                _this.router.navigate(['/unpack']);
                            }, 2000);
                        });
                    }
                    break;
                default:
                    _this.toastr.info('This box is @ status ' + box.Status, 'Wrong Status!', { dismiss: 'controlled' })
                        .then(function (toast) {
                        setTimeout(function () {
                            _this.toastr.dismissToast(toast);
                            _this.router.navigate(['/unpack']);
                        }, 2000);
                    });
                    break;
            }
        }, function (err) { return _this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
            .then(function (toast) {
            setTimeout(function () {
                _this.toastr.dismissToast(toast);
                _this.router.navigate(['/unpack']);
            }, 2000);
        }); }, function () { return _this.checkEmptyUpdateStatus(); });
    };
    UnPackBoxComponent.prototype.unpackSample = function (entry) {
        var _this = this;
        switch (entry.startsWith('BOX')) {
            case true:
                var boxId_1 = entry.replace('BOX', '');
                var box_1 = _.find(this.childBoxes, (function (b) { return b.BoxId === +boxId_1; }));
                if (box_1 === undefined) {
                    this.toastr.error('Box with id ' + boxId_1.toString() + ' not found', 'Wrong!'); //unpacking a box that is not here, disallowed
                }
                else {
                    box_1.ParentBoxId = null;
                    box_1.Status = 'Received';
                    box_1.Event = 'Unpacked from ' + this.box.Description;
                    this.boxService.saveBox(box_1).subscribe(function () {
                        _this.childBoxes = _.without(_this.childBoxes, box_1);
                        _this.toastr.success("box " + box_1.Description + " received", "Success!");
                        _this.soundService.beep('beep');
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!');
                        _this.soundService.beep('bong');
                    }, function () { return _this.checkEmptyUpdateStatus(); });
                }
                /* event.target.value = '';
                this.postInProgress = false; */
                break;
            default:
                this.setContextSample(entry);
                var sample_1 = _.find(this.samples, (function (s) { return s.SampleNo === _this.contextSample.SampleNo && s.SampTypeSuffix === _this.contextSample.SampTypeSuffix; }));
                if (sample_1 === undefined) {
                    //modal 'Not found, do you want to unpack anyway?'
                    this.unpackAnywayModal.show();
                }
                else {
                    console.log(this.box);
                    sample_1.Event = 'Unpacked from ' + this.box.Description + ' @ ' + this.box.Destination.Name;
                    this.sampleService.saveSample(sample_1)
                        .subscribe(function (id) {
                        sample_1.SampleId = id;
                        _this.samples = _.without(_this.samples, sample_1);
                        _this.sampleService.destroySample(sample_1)
                            .subscribe(function (s) {
                            _this.soundService.beep('beep');
                            _this.toastr.success(sample_1.SampleNo + ' unpacked!', 'Success!');
                        }, function (err) {
                            _this.toastr.error(err, 'Oh No!');
                            _this.soundService.beep('bong');
                        }, function () { return _this.checkEmptyUpdateStatus(); });
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                        _this.soundService.beep('bong');
                    });
                }
                break;
        }
    };
    UnPackBoxComponent.prototype.labnoScanned = function (event) {
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            this.unpackSample(entry);
            event.target.value = '';
            event.target.focus();
            this.postInProgress = false;
        }
        else {
            this.soundService.beep('bong');
            event.target.value = '';
            event.target.focus();
        }
        var a = this.el.nativeElement;
        a.focus();
    };
    UnPackBoxComponent.prototype.setContextSample = function (entry) {
        var labno = '';
        var smptypID = 0;
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
        };
        console.log(this.contextSample);
    };
    UnPackBoxComponent.prototype.navigateToParent = function () {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/unpacksamples', +this.box.ParentBoxId]);
    };
    UnPackBoxComponent.prototype.checkEmptyUpdateStatus = function () {
        var _this = this;
        //check if empty
        //console.log('checking empty ...');
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.box.Event = 'Unpacked & empty @ ' + this.globalsService.Context.Location;
            this.boxService.saveBox(this.box).subscribe(function (id) { return _this.toastr.info('box empty', 'Success!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/unpack']);
                }, 2000);
            }); });
        }
    };
    UnPackBoxComponent.prototype.samplesChanged = function (evt) {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = _.without(this.samples, evt);
        this.checkEmptyUpdateStatus();
    };
    UnPackBoxComponent.prototype.unpackEverything = function () {
        console.log('unpack owt');
    };
    UnPackBoxComponent.prototype.boxesChanged = function (evt) {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = _.without(this.childBoxes, evt);
        this.checkEmptyUpdateStatus();
    };
    UnPackBoxComponent.prototype.moveBoxModalHandler = function (modal, yesno) {
        var _this = this;
        console.log('move box', this.locations);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/unpack']);
                break;
            case 1:
                var l = _.find(this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                console.log(l);
                this.box.LastLocation = _.find(this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Destination = _.find(this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Status = 'BeingUnpacked';
                this.boxService.saveBox(this.box)
                    .subscribe(function (b) {
                    _this.toastr.success(_this.box.Description + ' status & location updated');
                }, function (err) {
                    _this.toastr.error(err, 'Oh dear!');
                }, function () { return modal.hide(); });
                var a = this.el.nativeElement;
                a.focus();
                break;
            default:
                modal.hide();
                break;
        }
    };
    UnPackBoxComponent.prototype.unpackAnywayModalHandler = function (modal, yesno) {
        var _this = this;
        switch (yesno) {
            case 0:
                modal.hide();
                //this.router.navigate(['/unpack']);
                break;
            case 1:
                //get sample, update (flatMap) location, event etc., destroy.
                var sample_2 = {
                    SampleId: 0,
                    SampleNo: this.contextSample.SampleNo,
                    SampTypeSuffix: this.contextSample.SampTypeSuffix,
                    BoxId: this.box.BoxId,
                    Row: 0,
                    Col: 0, SampleType: this.sampleTypes[this.contextSample.SampTypeSuffix],
                    DateTime: new Date(),
                    TrackingAuditId: '',
                    Event: 'unpacked from ' + this.box.Description + ' @ ' + (new Date()).toShortDateTimeString() + ' in ' + this.globalsService.Context.Location
                };
                this.sampleService.saveSample(sample_2)
                    .subscribe(function (smp) {
                    _this.sampleService.destroySampleById(smp).subscribe(function (smp) { return smp; }, function (err) { return console.log(err); });
                    _this.toastr.success(sample_2.SampleNo + ' unpacked!', 'Success!');
                }, function (err) { return console.log(err); }, function () { return modal.hide(); });
                break;
            default:
                modal.hide();
                break;
        }
    };
    UnPackBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var a = _this.el.nativeElement;
            a.focus();
            if (params['id'] == undefined) { }
            else {
                _this.getBoxAndContents(+params['id']);
            }
        });
    };
    __decorate([
        core_1.ViewChild('moveBoxModal'),
        __metadata("design:type", Object)
    ], UnPackBoxComponent.prototype, "moveBoxModal", void 0);
    __decorate([
        core_1.ViewChild('unpackAnywayModal'),
        __metadata("design:type", Object)
    ], UnPackBoxComponent.prototype, "unpackAnywayModal", void 0);
    __decorate([
        core_1.ViewChild('labno'),
        __metadata("design:type", core_1.ElementRef)
    ], UnPackBoxComponent.prototype, "el", void 0);
    UnPackBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/unpack-box-samples.component.html'
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
    ], UnPackBoxComponent);
    return UnPackBoxComponent;
}());
exports.UnPackBoxComponent = UnPackBoxComponent;
//# sourceMappingURL=unpak-box-samples.component.js.map