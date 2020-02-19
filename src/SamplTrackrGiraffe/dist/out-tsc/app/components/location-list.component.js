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
var location_service_1 = require("../services/location.service");
var LocationListComponent = /** @class */ (function () {
    function LocationListComponent(router, locationService) {
        this.router = router;
        this.locationService = locationService;
    }
    LocationListComponent.prototype.onSelect = function (location) {
        console.log(location);
        this.selectedLocation = location;
    };
    LocationListComponent.prototype.toggleEditable = function (loc) {
        loc.editable = !loc.editable;
    };
    LocationListComponent.prototype.accordionClick = function () {
        //this.selectedLocation = null;
    };
    //save(loc: LocationsDespatchLocation): void {
    LocationListComponent.prototype.save = function (loc) {
        loc.editable = false;
        this.locationService.upsertLocation(loc)
            .subscribe(function (uid) { return console.log(uid); }, function (err) { return console.log(err); });
    };
    LocationListComponent.prototype.containers = function (loc) {
        //alert(loc.LocationId);
        this.router.navigate(['/containers', loc.LocationId]);
    };
    LocationListComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocationsWithDespatchLocations()
            .subscribe(function (sites) {
            sites.forEach(function (s) {
                return s.LocationsDespatchLocations.forEach(function (l) { return l.editable = false; });
            });
            //this.sites = _.sortBy(sites, (n => n)); //WTF ?
            _this.sites = sites;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    LocationListComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    LocationListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector : 'users',
            templateUrl: '../../Templates/site-locations-list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            location_service_1.LocationService])
    ], LocationListComponent);
    return LocationListComponent;
}());
exports.LocationListComponent = LocationListComponent;
//# sourceMappingURL=location-list.component.js.map