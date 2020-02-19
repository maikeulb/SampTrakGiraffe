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
var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.locationsUrl = 'api/locations';
        this.locationDespatchLocationsUrl = '/api/despatchlocations';
    }
    LocationService.prototype.getLocations = function () {
        return this.http.get(this.locationsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationsWithDespatchLocations = function () {
        return this.http.get(this.locationDespatchLocationsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getAllSiteLocations = function () {
        return this.http.get('api/alllocations')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getDespatchLoctions = function () {
        var url = "api/despatchlocationsforlocid";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationByName = function (locName) {
        var url = "api/location/" + locName;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationById = function (locId) {
        var url = "api/location/" + locId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.updateDespatchLocations = function (locationId, despatchLocations) {
        var url = "api/despatchlocations/" + locationId;
        console.log(url);
        var bodyString = JSON.stringify(despatchLocations); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    LocationService.prototype.upsertLocation = function (location) {
        console.log('in service');
        var url = "api/location/" + location.LocationId;
        console.log(url);
        var bodyString = JSON.stringify(location); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, location, options) // ...using post request
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    LocationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map