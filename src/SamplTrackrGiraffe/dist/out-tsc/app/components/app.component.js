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
var global_service_1 = require("../services/global.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var core_2 = require("@ng-idle/core");
//import { Observable } from 'rxjs/Rx';
//import { LocationService } from './location.service';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { window } from 'rxjs/operator/window'; */
var AppComponent = /** @class */ (function () {
    function AppComponent(http, globalsService, idle, toastr, vcr) {
        var _this = this;
        this.http = http;
        this.globalsService = globalsService;
        this.idle = idle;
        this.toastr = toastr;
        this.vcr = vcr;
        this.title = 'Home';
        //location: Location;
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.contextUrl = 'api/context';
        this.toastr.setRootViewContainerRef(vcr);
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(600);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(600);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(core_2.DEFAULT_INTERRUPTSOURCES);
        idle.onIdleEnd.subscribe(function () {
            _this.idleState = 'No longer idle.';
            console.log(_this.idleState);
        });
        idle.onTimeout.subscribe(function () {
            _this.idleState = 'Timed out!';
            _this.timedOut = true;
            //console.log(this.idleState);
            window.location.assign('/account/logoff');
        });
        idle.onIdleStart.subscribe(function () { return _this.idleState = 'You\'ve gone idle!'; });
        idle.onTimeoutWarning.subscribe(function (countdown) {
            _this.idleState = 'You will time out in ' + countdown + ' seconds!';
            if (countdown <= 10) {
                _this.toastr.warning(_this.idleState, "**********");
            }
        });
        this.reset();
    }
    AppComponent.prototype.reset = function () {
        this.idle.watch();
        this.idleState = 'Started.';
        console.log(this.idleState);
        this.timedOut = false;
    };
    AppComponent.prototype.toggleContext = function () {
        console.log(this.isLocal);
        this.globalsService.IsLocal = this.isLocal;
        this.isAdmin = this.globalsService.Context.Admin;
        //location.reload();
        //this.globalsService.toggleContext(this.isLocal);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globalsService.getContext().subscribe(function (b) {
            _this.isAdmin = _this.globalsService.Context.Admin;
            //console.log('location', this.globalsService.Context.Location);
            console.log('global ctxt', _this.globalsService.Context);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: '../../Templates/app.component.html',
        }),
        __metadata("design:paramtypes", [http_1.Http,
            global_service_1.GlobalsService,
            core_2.Idle,
            ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map