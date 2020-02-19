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
var sample_service_1 = require("../services/sample.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var _ = require("underscore");
var SampleListComponent = /** @class */ (function () {
    function SampleListComponent(sampleService, toastr, vcr) {
        this.sampleService = sampleService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.removalMessage = "";
        this.SamplesChangedEvt = new core_1.EventEmitter();
        this.toastr.setRootViewContainerRef(vcr);
    }
    Object.defineProperty(SampleListComponent.prototype, "samples", {
        set: function (samples) {
            this.reverseSortedSamples = _.sortBy(samples, function (s, i) { return -i; });
        },
        enumerable: true,
        configurable: true
    });
    SampleListComponent.prototype.missing = function (s) {
        var _this = this;
        //set event to missing from this box.
        //remove from the box
        switch (this.parent) {
            case 'pack':
            case 'unpack':
                s.Event = "Not received in BOX" + s.BoxId + " @ " + (new Date).toShortDateTimeString();
                break;
            //case 'store':
            //    s.Event = "Removed from RACK" + s.RackId + " @ " + (new Date).toString();
            //    break;
            default:
                s.Event = "Missing @ " + (new Date).toShortDateTimeString();
                break;
        }
        this.sampleService.saveSample(s)
            .subscribe(function (id) {
            s.SampleId = id;
            _this.sampleService.destroySample(s).subscribe(function (id) {
                _this.reverseSortedSamples = _.without(_this.reverseSortedSamples, s);
                _this.SamplesChangedEvt.emit(s);
            });
        }, function (err) { return _this.toastr.error(err, 'Error'); });
    };
    SampleListComponent.prototype.sampleRemoved = function (sampleRemovedModal) {
        var _this = this;
        console.log(sampleRemovedModal);
        var s = this.contextSample;
        switch (this.parent) {
            case 'pack':
                s.Event = "Removed from BOX " + s.BoxId + " @ " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
            case 'store':
                s.Event = "Removed from RACK " + s.RackId + " @ " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
            default:
                s.Event = "Removed " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
        }
        this.sampleService.saveSample(s)
            .subscribe(function (id) {
            s.SampleId = id;
            _this.sampleService.destroySample(s).subscribe(function (id) {
                _this.reverseSortedSamples = _.without(_this.reverseSortedSamples, s);
                _this.SamplesChangedEvt.emit(s);
            });
        }, function (err) { return _this.toastr.error(err, 'Error'); });
        sampleRemovedModal.hide();
    };
    SampleListComponent.prototype.remove = function (s) {
        this.sampleRemovedModal.show();
        this.contextSample = s;
    };
    __decorate([
        core_1.ViewChild('sampleRemovedModal'),
        __metadata("design:type", Object)
    ], SampleListComponent.prototype, "sampleRemovedModal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SampleListComponent.prototype, "parent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SampleListComponent.prototype, "samples", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SampleListComponent.prototype, "SamplesChangedEvt", void 0);
    SampleListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sample-list',
            templateUrl: '../../Templates/samples-list.component.html'
        }),
        __metadata("design:paramtypes", [sample_service_1.SampleService,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], SampleListComponent);
    return SampleListComponent;
}());
exports.SampleListComponent = SampleListComponent;
//# sourceMappingURL=samples-list.component.js.map