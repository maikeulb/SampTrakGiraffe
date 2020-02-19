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
//import { LocationService } from './location.service';
var Rx_1 = require("rxjs/Rx");
//import 'rxjs/add/operator/map';
require("rxjs/add/operator/catch");
var GlobalsService = /** @class */ (function () {
    function GlobalsService(http) {
        this.http = http;
    }
    Object.defineProperty(GlobalsService.prototype, "IsLocal", {
        get: function () {
            return this.isLocal;
        },
        set: function (isLocal) {
            var _this = this;
            this.isLocal = isLocal;
            this.isLocal = this.isLocal === undefined ? false : this.isLocal;
            var url = "api/context/" + this.isLocal;
            this.http.get(url)
                .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); })
                .subscribe(function (r) {
                _this.isLocal = r.json();
                console.log('in global svc - ' + _this.isLocal);
                //window.location.reload(true)
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalsService.prototype, "Context", {
        get: function () {
            return this.context;
        },
        enumerable: true,
        configurable: true
    });
    GlobalsService.prototype.getContext = function () {
        var _this = this;
        //sessionStorage.setItem("source", JSON.stringify(source));
        return this.http.get("api/context")
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); })
            .map(function (res) {
            console.log(res);
            _this.context = res.json();
            console.log('svc', _this.Context);
            return;
        });
    };
    GlobalsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], GlobalsService);
    return GlobalsService;
}());
exports.GlobalsService = GlobalsService;
//# sourceMappingURL=global.service.js.map