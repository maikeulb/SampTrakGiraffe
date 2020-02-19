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
var box_service_1 = require("../services/box.service");
var sample_service_1 = require("../services/sample.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
//import { TLSSocket } from 'tls';
var BoxAuditComponent = /** @class */ (function () {
    /*
    = [
        { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: '', content: this.content },
        { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
        { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
        { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
        { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
        { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
        { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
        { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
        { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
        { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
        { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
      ];
    */
    function BoxAuditComponent(route, router, boxService, sampleService) {
        this.route = route;
        this.router = router;
        this.boxService = boxService;
        this.sampleService = sampleService;
        this.content = "content";
    }
    BoxAuditComponent.prototype.onSelect = function (box) {
        var _this = this;
        this.selectedBox = box;
        this.sampleService.getBoxSampleAuditsByTrackingID(box.TrackingAuditId)
            .subscribe(function (samples) { return _this.samples = samples; });
    };
    BoxAuditComponent.prototype.getBoxAudits = function (boxid) {
        var _this = this;
        this.boxService.getBoxAudits(boxid)
            .subscribe(function (boxauds) {
            //boxauds.forEach(ba => ba.DateTime = new Date(ba.DateTime.toLocaleString()));
            _this.boxAudits = boxauds;
            //this.timeline = boxauds.map((ba, i) =>
            //    ({ caption: ba.Status, date: new Date(ba.DateTime.toLocaleString()), title: `${ba.LastLocation} - ${ba.Description}`, content: ba.Event })
            //)
        }, function (err) { return console.log(err); });
    };
    BoxAuditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.boxid = +params['id'];
            _this.getBoxAudits(_this.boxid);
        });
    };
    BoxAuditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/box-audit.component.html',
            styleUrls: ['../../../node_modules/angular-vertical-timeline/dist/vertical-timeline.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            box_service_1.BoxService,
            sample_service_1.SampleService])
    ], BoxAuditComponent);
    return BoxAuditComponent;
}());
exports.BoxAuditComponent = BoxAuditComponent;
//# sourceMappingURL=box-audit.component.js.map