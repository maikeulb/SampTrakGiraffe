"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_list_component_1 = require("../components/user-list.component");
var location_list_component_1 = require("../components/location-list.component");
var container_list_component_1 = require("../components/container-list.component");
var box_list_component_1 = require("../components/box-list.component");
var rack_list_component_1 = require("../components/rack-list.component");
var store_samples_component_1 = require("../components/store-samples.component");
var pak_box_samples_component_1 = require("../components/pak-box-samples.component");
var unpak_box_samples_component_1 = require("../components/unpak-box-samples.component");
var select_component_byId_component_1 = require("../components/select-component-byId.component");
var sample_audit_component_1 = require("../components/sample-audit.component");
var box_audit_component_1 = require("../components/box-audit.component");
var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'users', component: user_list_component_1.UserListComponent },
    { path: 'locations', component: location_list_component_1.LocationListComponent },
    { path: 'containers', component: container_list_component_1.ContainerListComponent },
    { path: 'containers/:id', component: container_list_component_1.ContainerListComponent },
    { path: 'boxes', component: box_list_component_1.BoxListComponent },
    { path: 'boxes/:id', component: box_list_component_1.BoxListComponent },
    { path: 'racks', component: rack_list_component_1.RackListComponent },
    { path: 'racks/:id', component: rack_list_component_1.RackListComponent },
    { path: 'store', component: select_component_byId_component_1.SelectComponentByIdComponent },
    { path: 'racksamples/:id', component: store_samples_component_1.StoreSamplesComponent },
    { path: 'pack', component: select_component_byId_component_1.SelectComponentByIdComponent },
    { path: 'packsamples/:id', component: pak_box_samples_component_1.PackBoxComponent },
    { path: 'unpack', component: select_component_byId_component_1.SelectComponentByIdComponent },
    { path: 'unpacksamples/:id', component: unpak_box_samples_component_1.UnPackBoxComponent },
    { path: 'findsample', component: select_component_byId_component_1.SelectComponentByIdComponent },
    { path: 'sampleaudit/:id', component: sample_audit_component_1.SampleAuditComponent },
    { path: 'findbox', component: select_component_byId_component_1.SelectComponentByIdComponent },
    { path: 'boxaudit/:id', component: box_audit_component_1.BoxAuditComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { enableTracing: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map