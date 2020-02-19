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
var ContainerService = /** @class */ (function () {
    function ContainerService(http) {
        this.http = http;
        this.containersUrl = 'api/containers';
        this.containerTypesUrl = 'api/containertypes';
    }
    ContainerService.prototype.getContainers = function () {
        return this.http.get(this.containersUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.getContainerByLocationId = function (id) {
        var url = "api/containers/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.getContainerTypes = function () {
        return this.http.get(this.containerTypesUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.saveContainer = function (cnt) {
        return this.http.post(this.containersUrl, cnt)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    ContainerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ContainerService);
    return ContainerService;
}());
exports.ContainerService = ContainerService;
//# sourceMappingURL=container.service.js.map