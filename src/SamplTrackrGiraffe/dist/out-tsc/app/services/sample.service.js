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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var SampleService = /** @class */ (function () {
    function SampleService(http) {
        this.http = http;
        this.samplesUrl = 'api/samples';
    }
    SampleService.prototype.getSamplesByRackId = function (id) {
        var url = "api/racksamples/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.getSamplesByBoxId = function (id) {
        var url = "api/boxsamples/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.getSampleAudits = function (sampno) {
        var url = "api/sampleaudit/" + sampno;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.getBoxSampleAuditsByTrackingID = function (trackingId) {
        var url = "api/boxsampleaudits/" + trackingId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.saveSample = function (samp) {
        return this.http.post(this.samplesUrl, samp)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.destroySample = function (samp) {
        var url = "api/sample/" + samp.SampleId;
        return this.http.delete(url)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService.prototype.destroySampleById = function (sampid) {
        var url = "api/sample/" + sampid;
        return this.http.delete(url)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SampleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SampleService);
    return SampleService;
}());
exports.SampleService = SampleService;
//# sourceMappingURL=sample.service.js.map