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
var box_service_1 = require("../services/box.service");
var sounds_service_1 = require("../services/sounds.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var _ = require("underscore");
var BoxesListComponent = /** @class */ (function () {
    function BoxesListComponent(router, boxService, soundService, toastr, vcr) {
        this.router = router;
        this.boxService = boxService;
        this.soundService = soundService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.BoxesChangedEvt = new core_1.EventEmitter();
        this.toastr.setRootViewContainerRef(vcr);
    }
    BoxesListComponent.prototype.contents = function (b) {
        console.log(this.parent);
        switch (this.parent) {
            case 'pack':
                this.router.navigate(['/packsamples', b.BoxId]);
                break;
            case 'unpack':
                this.router.navigate(['/unpacksamples', b.BoxId]);
                break;
            default:
                break;
        }
    };
    BoxesListComponent.prototype.missing = function (b) {
        var _this = this;
        var perviousParent = b.ParentBoxId;
        b.ParentBoxId = null;
        b.Event = "Missing from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(function (id) {
            _this.boxes = _.without(_this.boxes, b);
            _this.soundService.beep('beep');
            _this.toastr.success(b.Description + ' removed.', 'Success!');
            _this.BoxesChangedEvt.emit(b);
        }, function (err) {
            _this.soundService.beep('bong');
            _this.toastr.error(err, "Bad!");
        });
    };
    BoxesListComponent.prototype.printLabel = function (box) {
        var _this = this;
        this.boxService.printLabel(box.BoxId)
            .subscribe(function (box) {
            _this.toastr.success(box.Description + ' lable printed.', 'Success!');
        }, function (err) {
            _this.soundService.beep('bong');
            console.log(err);
            _this.toastr.error(err, "Bad!");
        });
    };
    BoxesListComponent.prototype.remove = function (b) {
        var _this = this;
        var perviousParent = b.ParentBoxId;
        b.ParentBoxId = null;
        b.Event = "Removed from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(function (id) {
            _this.boxes = _.without(_this.boxes, b);
            _this.toastr.success(b.Description + ' removed.', 'Success!');
            _this.BoxesChangedEvt.emit(b);
        }, function (err) {
            _this.soundService.beep('bong');
            _this.toastr.error(err, "Bad!");
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BoxesListComponent.prototype, "parent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BoxesListComponent.prototype, "boxes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BoxesListComponent.prototype, "BoxesChangedEvt", void 0);
    BoxesListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'box-list',
            templateUrl: '../../Templates/boxes-list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            box_service_1.BoxService,
            sounds_service_1.SoundService,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], BoxesListComponent);
    return BoxesListComponent;
}());
exports.BoxesListComponent = BoxesListComponent;
//# sourceMappingURL=boxes-list.component.js.map