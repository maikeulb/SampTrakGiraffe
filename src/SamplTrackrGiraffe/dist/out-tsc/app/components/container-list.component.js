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
var container_service_1 = require("../services/container.service");
var location_service_1 = require("../services/location.service");
require("rxjs/add/operator/switchMap");
var _ = require("underscore");
var ContainerListComponent = /** @class */ (function () {
    function ContainerListComponent(route, router, containerService, locationService) {
        this.route = route;
        this.router = router;
        this.containerService = containerService;
        this.locationService = locationService;
    }
    ContainerListComponent.prototype.onSelect = function (location) {
        this.selectedLocation = location;
    };
    ContainerListComponent.prototype.onItemDrop = function (e, ky) {
        var _this = this;
        // Get the dropped data here 
        var draggedContainer = e.dragData;
        var previousLocation = draggedContainer.Location.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(function (loc) {
            draggedContainer.Location = loc;
            _this.containerService.saveContainer(draggedContainer)
                .subscribe(function (id) {
                _this.containers[previousLocation] = _.without(_this.containers[previousLocation], _this.containers[previousLocation].find(function (cnt) { return cnt.ContainerId == id; }));
                _this.containers[ky] = _this.containers[ky].concat(draggedContainer);
            }, function (err) { return console.log(err); });
        });
    };
    ContainerListComponent.prototype.toggleEditable = function (cntnr) {
        cntnr.editable = !cntnr.editable;
    };
    ContainerListComponent.prototype.save = function (cntnr) {
        cntnr.editable = false;
        this.containerService.saveContainer(cntnr)
            .subscribe(function (id) { return cntnr.ContainerId = id; }, function (err) { return console.log(err); });
    };
    ContainerListComponent.prototype.racks = function (container) {
        //alert(loc.LocationId);
        this.router.navigate(['/racks', container.ContainerId]);
    };
    ContainerListComponent.prototype.create = function (loc) {
        var _loc = _.find(this.locations, (function (l) { return l.Name == loc; }));
        var cntnr = {
            ContainerId: -1,
            ContainerType: '',
            Description: 'New',
            Location: _loc,
            editable: true
        };
        this.containers[loc].push(cntnr);
        console.log(loc);
    };
    ContainerListComponent.prototype.getAllContainers = function () {
        var _this = this;
        //console.log('get all')
        this.containerService.getContainers()
            .subscribe(function (containers) {
            containers.forEach(function (c) { return c.editable = false; });
            var grouped = _.groupBy(containers, (function (c) { return c.Location.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.containers = grouped;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getContainersById = function (id) {
        var _this = this;
        //console.log('in by Id')
        this.containerService.getContainerByLocationId(id)
            .subscribe(function (containers) {
            containers.forEach(function (c) { return c.editable = false; });
            var grouped = _.groupBy(containers, (function (c) { return c.Location.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n)); // arrayOfKeys needs to be gen from locations, otherwise empty ones don't display.
            _this.containers = grouped;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getContainerTypes = function () {
        var _this = this;
        console.log('ctypes');
        this.containerService.getContainerTypes()
            .subscribe(function (containertypes) {
            _this.containerTypes = containertypes;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getLocations = function () {
        var _this = this;
        console.log('locs');
        this.locationService.getLocations()
            .subscribe(function (sites) {
            var slocs = _.map(sites, (function (s) { return s.Locations; }));
            _this.locations = _.flatten(slocs, false);
            _this.arrayOfKeys = _.sortBy(_.map(_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
            console.log(_this.arrayOfKeys);
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    ContainerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            console.log(params['id']);
            _this.getContainerTypes();
            _this.getLocations();
            if (params['id'] == undefined) {
                _this.getAllContainers();
            }
            else {
                _this.getContainersById(+params['id']);
            }
        });
    };
    ContainerListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector : 'users',
            templateUrl: '../../Templates/container-list.component.html'
            //template : '<h1>Containers</h1>'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            container_service_1.ContainerService,
            location_service_1.LocationService])
    ], ContainerListComponent);
    return ContainerListComponent;
}());
exports.ContainerListComponent = ContainerListComponent;
//# sourceMappingURL=container-list.component.js.map