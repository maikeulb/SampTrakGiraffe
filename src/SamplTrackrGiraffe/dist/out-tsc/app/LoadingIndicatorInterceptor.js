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
var loading_indicator_service_1 = require("./services/loading-indicator.service");
var core_1 = require("@angular/core");
require("rxjs/add/operator/finally");
var LoadingIndicatorInterceptor = /** @class */ (function () {
    function LoadingIndicatorInterceptor(loadingIndicatorService) {
        this.loadingIndicatorService = loadingIndicatorService;
    }
    LoadingIndicatorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // emit onStarted event before request execution
        //console.log('intercept');
        this.loadingIndicatorService.onStarted(req);
        return next
            .handle(req)
            // emit onFinished event after request execution
            .finally(function () { return _this.loadingIndicatorService.onFinished(req); });
    };
    LoadingIndicatorInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [loading_indicator_service_1.LoadingIndicatorService])
    ], LoadingIndicatorInterceptor);
    return LoadingIndicatorInterceptor;
}());
exports.LoadingIndicatorInterceptor = LoadingIndicatorInterceptor;
//# sourceMappingURL=LoadingIndicatorInterceptor.js.map