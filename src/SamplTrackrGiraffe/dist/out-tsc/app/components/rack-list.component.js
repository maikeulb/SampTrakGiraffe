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
var rack_service_1 = require("../services/rack.service");
var global_service_1 = require("../services/global.service");
require("rxjs/add/operator/switchMap");
var _ = require("underscore");
var RackListComponent = /** @class */ (function () {
    function RackListComponent(route, router, rackService, globalsService) {
        this.route = route;
        this.router = router;
        this.rackService = rackService;
        this.globalsService = globalsService;
    }
    RackListComponent.prototype.getAllRacks = function () {
        var _this = this;
        console.log('get all');
        this.rackService.getRacks()
            .subscribe(function (cracks) {
            cracks.forEach(function (cr) { return cr.Racks.forEach(function (r) { return r.editable = false; }); });
            _this.cracks = _.sortBy(cracks, (function (cr) { return cr.Container.Description; }));
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    RackListComponent.prototype.getRacksById = function (id) {
        var _this = this;
        console.log('in by Id');
        this.rackService.getRackByContainerId(id)
            .subscribe(function (cracks) {
            cracks.forEach(function (cr) { return cr.Racks.forEach(function (r) { return r.editable = false; }); });
            _this.cracks = _.sortBy(cracks, (function (cr) { return cr.Container.Description; }));
        }, //Bind to view
        function (//Bind to view
        err) { return console.log(err); });
    };
    RackListComponent.prototype.toggleEditable = function (rack) {
        rack.editable = !rack.editable;
    };
    RackListComponent.prototype.samples = function (rack) {
        this.router.navigate(['/racksamples', rack.RackId]);
    };
    RackListComponent.prototype.save = function (rack) {
        rack.editable = false;
        this.rackService.saveRack(rack)
            .subscribe(function (id) {
            rack.RackId = id;
            console.log(rack);
        }, function (err) { return console.log(err); });
    };
    RackListComponent.prototype.create = function (crack) {
        var rack = { RackId: -1, Description: 'New Rack', Rows: 0, Cols: 0, ContainerId: crack.Container.ContainerId, Status: 'Empty', editable: true };
        crack.Racks.push(rack);
    };
    RackListComponent.prototype.onItemDrop = function (e, cr) {
        var _this = this;
        // Get the dropped data here 
        var draggedRack = e.dragData;
        var prevContainerId = draggedRack.ContainerId;
        draggedRack.ContainerId = cr.Container.ContainerId;
        this.rackService.saveRack(draggedRack)
            .subscribe(function (r) {
            var oldCrack = _this.cracks.find(function (cr) { return cr.Container.ContainerId === prevContainerId; });
            oldCrack.Racks = _.without(oldCrack.Racks, draggedRack);
            var newCrack = _this.cracks.find(function (svrcr) { return svrcr.Container.ContainerId === cr.Container.ContainerId; });
            newCrack.Racks = newCrack.Racks.concat(draggedRack);
            console.log(newCrack);
        });
    };
    RackListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.globalsService.getContext().subscribe(function (b) {
                _this.isAdmin = _this.globalsService.Context.Admin;
                if (params['id'] == undefined) {
                    _this.getAllRacks();
                }
                else {
                    _this.getRacksById(+params['id']);
                }
            });
        });
    };
    RackListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector : 'users',
            templateUrl: '../../Templates/rack-list.component.html'
            //template : '<h1>Containers</h1>'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            rack_service_1.RackService,
            global_service_1.GlobalsService])
    ], RackListComponent);
    return RackListComponent;
}());
exports.RackListComponent = RackListComponent;
//# sourceMappingURL=rack-list.component.js.map