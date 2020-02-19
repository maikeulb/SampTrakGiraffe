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
var BoxService = /** @class */ (function () {
    function BoxService(http) {
        this.http = http;
        this.BoxsUrl = 'api/boxes';
        this.BoxTypesUrl = 'api/boxtypes';
    }
    BoxService.prototype.getBoxs = function () {
        return this.http.get(this.BoxsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxByLocationId = function (id) {
        var url = "api/boxes/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getChildBoxes = function (id) {
        var url = "api/childboxes/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxByBoxId = function (id) {
        var url = "api/box/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.printLabel = function (id) {
        var url = "api/boxlabel/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error._body || 'Server error'); });
    };
    BoxService.prototype.getBoxAudits = function (id) {
        var url = "api/boxaudit/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxTypes = function () {
        return this.http.get(this.BoxTypesUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.saveBox = function (box) {
        return this.http.post(this.BoxsUrl, box)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.moveBoxSamples = function (startid, endid) {
        var url = "api/moveboxsamples/" + startid + "/" + endid;
        return this.http.post(url, null)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    BoxService.prototype.packChildBox = function (box) {
        return this.http.post('api/packchildbox', box)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    BoxService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], BoxService);
    return BoxService;
}());
exports.BoxService = BoxService;
//# sourceMappingURL=box.service.js.map