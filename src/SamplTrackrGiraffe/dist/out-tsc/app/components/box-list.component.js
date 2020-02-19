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
var box_service_1 = require("../services/box.service");
var location_service_1 = require("../services/location.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/switchMap");
var _ = require("underscore");
var BoxListComponent = /** @class */ (function () {
    function BoxListComponent(route, router, boxService, locationService) {
        this.route = route;
        this.router = router;
        this.boxService = boxService;
        this.locationService = locationService;
    }
    BoxListComponent.prototype.onSelect = function (location) {
        this.selectedLocation = location;
    };
    BoxListComponent.prototype.onItemDrop = function (e, ky) {
        var _this = this;
        // Get the dropped data here 
        var draggedBox = e.dragData;
        var previousLocation = draggedBox.LastLocation.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(function (loc) {
            draggedBox.LastLocation = loc;
            draggedBox.Event = 'Moved from ' + previousLocation + ' to ' + loc.Name;
            _this.boxService.saveBox(draggedBox)
                .subscribe(function (svrbox) {
                _this.boxes[previousLocation] = _.without(_this.boxes[previousLocation], _this.boxes[previousLocation].find(function (box) { return box.BoxId == svrbox.BoxId; }));
                _this.boxes[ky] = _this.boxes[ky].concat(draggedBox);
            }, function (err) { return console.log(err); });
        });
    };
    BoxListComponent.prototype.toggleEditable = function (box) {
        box.editable = !box.editable;
    };
    BoxListComponent.prototype.printLabel = function (box) {
        this.boxService.printLabel(box.BoxId)
            .subscribe(function (box) {
            return console.log(box);
        });
    };
    BoxListComponent.prototype.save = function (box) {
        var _this = this;
        box.editable = false;
        console.log(box, 'being saved');
        var loc = box.LastLocation.Name;
        this.boxService.saveBox(box)
            .subscribe(function (_box) {
            console.log(_box.BoxId);
            if (_this.boxes[loc] != undefined) {
                _this.boxes[loc] = _.without(_this.boxes[loc], box);
                _this.boxes[loc].push(_box);
            }
            else {
                _this.boxes[loc] = [_box];
            }
            console.log(box);
        }, function (err) { return console.log(err); });
    };
    BoxListComponent.prototype.racks = function (box) {
        this.router.navigate(['/racks', box.BoxId]);
    };
    BoxListComponent.prototype.create = function (loc) {
        var _loc = _.find(this.locations, (function (l) { return l.Name == loc; }));
        var box = {
            BoxId: -1,
            BoxType: '',
            Description: 'New',
            LastLocation: _loc,
            Destination: _loc,
            LastMoved: new Date(),
            User: '',
            Status: 'Unpacked',
            Event: 'Created',
            TrackingAuditId: '',
            editable: true
        };
        if (this.boxes[loc] != undefined) {
            this.boxes[loc].push(box);
        }
        else {
            this.boxes[loc] = [box];
        }
    };
    BoxListComponent.prototype.contents = function (box) {
        this.router.navigate(['/packsamples', box.BoxId]);
    };
    BoxListComponent.prototype.audit = function (box) {
        this.router.navigate(['/boxaudit', box.BoxId]);
    };
    BoxListComponent.prototype.getXHRDataAll = function () {
        var _this = this;
        Observable_1.Observable.forkJoin(this.boxService.getBoxTypes(), this.locationService.getLocations(), this.boxService.getBoxs())
            .subscribe(function (res) {
            _this.boxTypes = res[0];
            var slocs = _.map(res[1], (function (s) { return s.Locations; }));
            _this.locations = _.flatten(slocs, false);
            _this.arrayOfKeys = _.sortBy(_.map(_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
            res[2].forEach(function (b) { return b.editable = false; });
            var grouped = _.groupBy(res[2], (function (b) { return b.LastLocation.Name; }));
            _this.boxes = grouped;
        });
    };
    BoxListComponent.prototype.getAllBoxs = function () {
        var _this = this;
        this.boxService.getBoxs()
            .subscribe(function (boxs) {
            boxs.forEach(function (b) { return b.editable = false; });
            var grouped = _.groupBy(boxs, (function (b) { return b.LastLocation.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.boxes = grouped;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    BoxListComponent.prototype.getBoxsById = function (id) {
        var _this = this;
        this.boxService.getBoxByLocationId(id)
            .subscribe(function (boxs) {
            boxs.forEach(function (b) { return b.editable = false; });
            var grouped = _.groupBy(boxs, (function (b) { return b.LastLocation.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.boxes = grouped;
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    BoxListComponent.prototype.getBoxTypes = function () {
        var _this = this;
        this.boxService.getBoxTypes()
            .subscribe(function (boxtypes) {
            _this.boxTypes = boxtypes;
            console.log(_this.boxTypes);
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    BoxListComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations()
            .subscribe(function (sites) {
            var slocs = _.map(sites, (function (s) { return s.Locations; }));
            _this.locations = _.flatten(slocs, false);
            _this.arrayOfKeys = _.sortBy(_.map(_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    BoxListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            if (params['id'] == undefined) {
                _this.getXHRDataAll();
            }
            else {
                _this.getBoxTypes();
                _this.getBoxsById(+params['id']);
                _this.getLocations();
            }
        });
    };
    BoxListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector : 'users',
            templateUrl: '../../Templates/box-list.component.html'
            //template : '<h1>Boxs</h1>'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            box_service_1.BoxService,
            location_service_1.LocationService])
    ], BoxListComponent);
    return BoxListComponent;
}());
exports.BoxListComponent = BoxListComponent;
//# sourceMappingURL=box-list.component.js.map