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
var router_1 = require("@angular/router");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
require("rxjs/add/operator/switchMap");
var SampleAuditComponent = /** @class */ (function () {
    function SampleAuditComponent(route, router, sampleService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.toastr.setRootViewContainerRef(vcr);
    }
    SampleAuditComponent.prototype.getSampleAudits = function (smpno) {
        var _this = this;
        switch (smpno.length) {
            case 10:
                var sampno = smpno.substr(0, 9);
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(function (sampauds) { return _this.sampleAudits = sampauds; }, function (err) { return console.log(err); });
                break;
            default:
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(function (sampauds) { return _this.sampleAudits = sampauds; }, function (err) { return console.log(err); });
                break;
        }
    };
    SampleAuditComponent.prototype.samples = function (s) {
        if (s.BoxId > 0) {
            this.router.navigate(['/boxaudit', s.BoxId]); //SampleAudit type needs Box/Rack ids.
        }
        if (s.RackId > 0) {
            this.router.navigate(['/racksamples', s.RackId]); //SampleAudit type needs Box/Rack ids.
        }
        //this.toastr.info('not found','?');
    };
    SampleAuditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.sampleNo = params['id'];
            _this.getSampleAudits(_this.sampleNo);
        });
    };
    SampleAuditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/sample-audit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            sample_service_1.SampleService,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], SampleAuditComponent);
    return SampleAuditComponent;
}());
exports.SampleAuditComponent = SampleAuditComponent;
//# sourceMappingURL=sample-audit.component.js.map