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
var loading_indicator_service_1 = require("../services/loading-indicator.service");
var LoadingIndicatorComponent = /** @class */ (function () {
    function LoadingIndicatorComponent(loadingIndicatorService) {
        var _this = this;
        this.loadingIndicatorService = loadingIndicatorService;
        this.loading = false;
        loadingIndicatorService
            .onLoadingChanged
            .subscribe(function (isLoading) { return _this.loading = isLoading; });
    }
    LoadingIndicatorComponent.prototype.ngOnInit = function () {
    };
    LoadingIndicatorComponent = __decorate([
        core_1.Component({
            selector: 'app-loading-indicator',
            templateUrl: './loading-indicator.component.html',
            styleUrls: ['./loading-indicator.component.css']
        }),
        __metadata("design:paramtypes", [loading_indicator_service_1.LoadingIndicatorService])
    ], LoadingIndicatorComponent);
    return LoadingIndicatorComponent;
}());
exports.LoadingIndicatorComponent = LoadingIndicatorComponent;
//# sourceMappingURL=loading-indicator.component.js.map