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
//loc-despatch-locs-list.component.ts
var core_1 = require("@angular/core");
var types_1 = require("../types");
var location_service_1 = require("../services/location.service");
var _ = require("underscore");
var LocationDespatchSitesComponent = /** @class */ (function () {
    function LocationDespatchSitesComponent(locationService) {
        this.locationService = locationService;
    }
    LocationDespatchSitesComponent.prototype.onMemberShipChanged = function (location) {
        console.log(this.location);
        var despatchLocations = _.filter(_.flatten(this.location.DespatchLocations.map(function (s) { return s.LocationMembership.map(function (lm) { return lm.IsMember ? lm.LocationId : 0; }); }), true), function (l) { return l > 0; });
        console.log(despatchLocations);
        this.locationService.updateDespatchLocations(this.location.LocationId, despatchLocations)
            .subscribe(function (uid) { return console.log(uid); }, function (err) { return console.log(err); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LocationDespatchSitesComponent.prototype, "sites", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", types_1.LocationsDespatchLocation)
    ], LocationDespatchSitesComponent.prototype, "location", void 0);
    LocationDespatchSitesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'location-despatch-sites',
            templateUrl: '../../Templates/location-despatch-sites.component.html',
            styles: ["\n        td{font-family : monospace;}\n        table { background-color: white;\n                border-collapse: collapse;\n                width:100%;\n        }\n        table, th, td {\n            border: 1px solid black;\n            padding : 5px;\n        }"
            ]
        }),
        __metadata("design:paramtypes", [location_service_1.LocationService])
    ], LocationDespatchSitesComponent);
    return LocationDespatchSitesComponent;
}());
exports.LocationDespatchSitesComponent = LocationDespatchSitesComponent;
//# sourceMappingURL=loc-despatch-locs-list.component.js.map