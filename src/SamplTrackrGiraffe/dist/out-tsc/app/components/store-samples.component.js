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
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var router_1 = require("@angular/router");
var sample_service_1 = require("../services/sample.service");
var rack_service_1 = require("../services/rack.service");
var sounds_service_1 = require("../services/sounds.service");
require("rxjs/add/operator/switchMap");
var _ = require("underscore");
//import * as $ from 'jquery';
var d3 = require("d3");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
//import { CustomOption } from './toastr-options';
//import { ToastOptions } from 'ng2-toastr/ng2-toastr';
var StoreSamplesComponent = /** @class */ (function () {
    function StoreSamplesComponent(route, router, sampleService, rackService, soundService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.rackService = rackService;
        this.soundService = soundService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.postInProgress = false;
        this.rackIsFull = false;
        this.sampleTypes = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.toastr.setRootViewContainerRef(vcr);
    }
    StoreSamplesComponent.prototype.getSamplesByRackId = function (rakid) {
        var _this = this;
        this.sampleService.getSamplesByRackId(rakid)
            .subscribe(function (samples) {
            _this.samples = samples;
            _this.currentPos = samples.length > 0 ? { Row: samples[samples.length - 1].Row, Col: samples[samples.length - 1].Col } : { Row: 1, Col: 0 };
            _this.getRackById(rakid);
        }, function (err) {
            console.log(err);
            _this.soundService.beep('bong');
            _this.router.navigate(['/store']);
        });
    };
    StoreSamplesComponent.prototype.getRackById = function (rakid) {
        var _this = this;
        this.rackService.getRackById(rakid)
            .subscribe(function (rack) {
            _this.rack = rack;
            if (rack.Status === 'Full') {
                _this.emptyModal.show();
            }
            else {
                _this.updatePostion();
            }
            _this.initRack();
        }, function (err) {
            console.log(err);
            _this.soundService.beep('bong');
            _this.router.navigate(['/store']); //that rack dont exist, bruv
        });
    };
    StoreSamplesComponent.prototype.labnoScanned = function (event) {
        var _this = this;
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.replace('-', '');
            var labno = '';
            var smptypID = 0;
            if (entry.length == 10) {
                labno = entry.substr(0, 9).toUpperCase();
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
            var sample_1 = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: this.currentPos.Row, Col: this.currentPos.Col, RackId: this.rack.RackId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), Event: 'stored', TrackingAuditId: '' };
            this.sampleService.saveSample(sample_1)
                .subscribe(function (id) {
                sample_1.SampleId = id;
                _this.samples = _this.samples.concat(sample_1);
                event.target.value = '';
                _this.postInProgress = false;
                _this.updatePostion();
                _this.drawRack();
                _this.soundService.beep('beep');
                _this.toastr.success(sample_1.SampleNo + ' stored!', 'Success!');
            }, function (err) {
                _this.toastr.success(err, 'Success!'); //, { positionClass: 'toast-bottom-right' });
                _this.soundService.beep('bong');
            });
        }
        else {
            this.soundService.beep('bong');
        }
    };
    StoreSamplesComponent.prototype.updatePostion = function () {
        if (!(this.rack.Status === 'Full')) {
            this.currentPos.Col++;
            console.log(this.currentPos);
            if (this.rack.Status === 'Empty') {
                this.rack.Status = 'InUse';
                this.rackService.saveRack(this.rack)
                    .subscribe(function (id) { return null; }, function (err) { return console.log(err); });
            }
            if (this.currentPos.Row >= this.rack.Rows && this.currentPos.Col > this.rack.Cols) {
                //if (this.currentPos.Row * this.currentPos.Col >= this.rack.Rows * this.rack.Cols) {
                this.rackIsFull = true;
                this.rack.Status = 'Full';
                this.rackFull();
            }
            if (this.currentPos.Col > this.rack.Cols) {
                this.currentPos.Row++;
                this.currentPos.Col = 1;
            }
            //if (this.currentPos.Row > this.rack.Rows) {
            //    this.rackIsFull = true;
            //    this.rack.Status = 'Full';
            //    this.rackFull();
            //}
            var a = this.el.nativeElement;
            a.focus();
        }
        else {
            this.toastr.info('Rack full!', 'Full!');
            this.soundService.beep('bong');
            this.router.navigate(['/store']);
        }
    };
    StoreSamplesComponent.prototype.initRack = function () {
        d3.select('svg')
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.svg = d3.select('svg > g');
        this.drawRack();
    };
    StoreSamplesComponent.prototype.drawRack = function () {
        var maxRow = this.rack.Rows;
        var maxCol = this.rack.Cols;
        this.y.domain([1, maxRow]);
        this.x.domain([1, maxCol]);
        var that = this;
        var circles = this.svg
            .selectAll("circle");
        //circles.data(this.samples, (smp, i, oi) => {
        //        console.log(i.toString () + ' ' + smp.SampleId.toString());
        //        return smp.SampleId.toString()
        //}) // key function, uses PK from table - cannot get to work.
        circles.data(this.samples)
            .enter()
            .append("circle")
            .attr('cy', function (s, i) { return that.y(s.Row); })
            .attr("cx", function (s, i) { return that.x(s.Col); })
            .attr("fill", "#eeeeff")
            .attr("stroke", "black")
            .attr('stroke-width', 1)
            //.attr("r", this.height / (d3.max([maxRow, maxCol]) * 2) - 1) + "px";
            .attr("r", (this.width / (d3.max([maxRow, maxCol]) * 6)) - 1 + "px");
        //let removed = circles.data(this.samples).exit().remove();
        var xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("top")
            .tickSize(1);
        var yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("left");
        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + -this.margin.top / 2 + ")")
            .call(xAxis.ticks(maxCol));
        this.svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + -this.margin.left / 2 + ",0)")
            .call(yAxis.ticks(maxRow));
    };
    StoreSamplesComponent.prototype.emptyRack = function (emptyRackModal) {
        console.log(this.svg);
        this.rack.Status = 'Empty';
        this.rackService.saveRack(this.rack)
            .subscribe(function (id) { return console.log(id); }, function (err) { return console.log(err); });
        emptyRackModal.hide();
        this.samples = [];
        this.currentPos = { Row: 1, Col: 1 };
        this.svg.selectAll('g > circle').remove();
    };
    StoreSamplesComponent.prototype.rackFull = function () {
        var _this = this;
        this.rackService.saveRack(this.rack)
            .subscribe(function (id) {
            _this.toastr.info('Rack full!', 'Full!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/store']);
                }, 2000);
            });
        }, function (err) { return console.log(err); });
    };
    //sample removed, actually
    StoreSamplesComponent.prototype.samplesChanged = function (evt) {
        console.log('samples changed...');
        this.svg.selectAll('circle').remove();
        this.samples = _.without(this.samples, evt);
        this.currentPos = this.samples.length > 0 ? { Row: this.samples[this.samples.length - 1].Row, Col: this.samples[this.samples.length - 1].Col } : { Row: 1, Col: 0 };
        this.updatePostion();
        //if there's no samples left, reset the current Pos to {1,0}
        /*if (this.samples.length === 0) {
            this.currentPos = { Row: 1, Col: 0 };
        }*/
        this.drawRack();
        var a = this.el.nativeElement;
        a.focus();
    };
    StoreSamplesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalWidth = window.screen.width / 2;
        this.width = this.totalWidth - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;
        this.y = d3.scale.linear().range([0, this.height]);
        this.x = d3.scale.linear().range([0, this.width]);
        this.route.params
            .subscribe(function (params) {
            console.log(params['id']);
            if (params['id'] == undefined) { }
            else {
                _this.getSamplesByRackId(+params['id']);
            }
        });
    };
    __decorate([
        core_1.ViewChild('labno'),
        __metadata("design:type", core_1.ElementRef)
    ], StoreSamplesComponent.prototype, "el", void 0);
    __decorate([
        core_1.ViewChild('emptyRackModal'),
        __metadata("design:type", Object)
    ], StoreSamplesComponent.prototype, "emptyModal", void 0);
    StoreSamplesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/store-samples.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            sample_service_1.SampleService,
            rack_service_1.RackService,
            sounds_service_1.SoundService,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], StoreSamplesComponent);
    return StoreSamplesComponent;
}());
exports.StoreSamplesComponent = StoreSamplesComponent;
//# sourceMappingURL=store-samples.component.js.map