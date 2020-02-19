"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
//import { RouterModule }   from '@angular/router';
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_drag_drop_1 = require("ng2-drag-drop");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var core_2 = require("@ng-idle/core");
var app_component_1 = require("../components/app.component");
var user_list_component_1 = require("../components/user-list.component");
var user_sites_list_component_1 = require("../components/user-sites-list.component");
var location_list_component_1 = require("../components/location-list.component");
var container_list_component_1 = require("../components/container-list.component");
var box_list_component_1 = require("../components/box-list.component");
var rack_list_component_1 = require("../components/rack-list.component");
var store_samples_component_1 = require("../components/store-samples.component");
var samples_list_component_1 = require("../components/samples-list.component");
var sample_audit_component_1 = require("../components/sample-audit.component");
var pak_box_samples_component_1 = require("../components/pak-box-samples.component");
var unpak_box_samples_component_1 = require("../components/unpak-box-samples.component");
var modal_component_1 = require("../components/modal.component");
var select_component_byId_component_1 = require("../components/select-component-byId.component");
var boxes_list_component_1 = require("../components/boxes-list.component");
var box_audit_component_1 = require("../components/box-audit.component");
var horizontal_timeline_component_1 = require("../components/horizontal-timeline.component");
var loc_despatch_locs_list_component_1 = require("../components/loc-despatch-locs-list.component");
var loading_indicator_service_1 = require("../services/loading-indicator.service");
var user_service_1 = require("../services/user.service");
var location_service_1 = require("../services/location.service");
var container_service_1 = require("../services/container.service");
var box_service_1 = require("../services/box.service");
var rack_service_1 = require("../services/rack.service");
var sample_service_1 = require("../services/sample.service");
var sounds_service_1 = require("../services/sounds.service");
var global_service_1 = require("../services/global.service");
var app_routing_module_1 = require("../modules/app-routing.module");
//import { EscapePipe, TruncatePipe, ToShortDateTimePipe} from '../pipes.pipe';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_drag_drop_1.Ng2DragDropModule,
                animations_1.BrowserAnimationsModule,
                ng2_toastr_1.ToastModule.forRoot(),
                ng_bootstrap_1.NgbModule.forRoot(),
                core_2.NgIdleModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                modal_component_1.ModalComponent,
                user_list_component_1.UserListComponent,
                user_sites_list_component_1.UserSiteListComponent,
                location_list_component_1.LocationListComponent,
                container_list_component_1.ContainerListComponent,
                box_list_component_1.BoxListComponent,
                rack_list_component_1.RackListComponent,
                store_samples_component_1.StoreSamplesComponent,
                samples_list_component_1.SampleListComponent,
                sample_audit_component_1.SampleAuditComponent,
                boxes_list_component_1.BoxesListComponent,
                select_component_byId_component_1.SelectComponentByIdComponent,
                pak_box_samples_component_1.PackBoxComponent,
                unpak_box_samples_component_1.UnPackBoxComponent,
                box_audit_component_1.BoxAuditComponent,
                horizontal_timeline_component_1.HorizontalTimelineComponent,
                loc_despatch_locs_list_component_1.LocationDespatchSitesComponent
                /*         EscapePipe,
                        TruncatePipe,
                        ToShortDateTimePipe */
            ],
            providers: [
                user_service_1.UserService,
                location_service_1.LocationService,
                container_service_1.ContainerService,
                box_service_1.BoxService,
                rack_service_1.RackService,
                sample_service_1.SampleService,
                sounds_service_1.SoundService,
                global_service_1.GlobalsService,
                loading_indicator_service_1.LoadingIndicatorService
                /*{
                    provide: HTTP_INTERCEPTORS,
                    useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptor(service),
                    multi: true,
                    deps: [LoadingIndicatorService]
                }*/
                //{ provide: ToastOptions, useClass: CustomOption }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map