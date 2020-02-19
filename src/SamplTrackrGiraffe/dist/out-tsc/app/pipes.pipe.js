"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EscapePipe = /** @class */ (function () {
    function EscapePipe() {
    }
    EscapePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.replace('\'', '');
    };
    EscapePipe = __decorate([
        core_1.Pipe({ name: 'escape' })
    ], EscapePipe);
    return EscapePipe;
}());
exports.EscapePipe = EscapePipe;
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        var len = +args[0];
        return value.substr(0, len) + '...';
    };
    TruncatePipe = __decorate([
        core_1.Pipe({ name: 'truncate' })
    ], TruncatePipe);
    return TruncatePipe;
}());
exports.TruncatePipe = TruncatePipe;
var ToShortDateTimePipe = /** @class */ (function () {
    function ToShortDateTimePipe() {
    }
    ToShortDateTimePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.toShortDateTimeString();
    };
    ToShortDateTimePipe = __decorate([
        core_1.Pipe({ name: 'toShortDateTime' })
    ], ToShortDateTimePipe);
    return ToShortDateTimePipe;
}());
exports.ToShortDateTimePipe = ToShortDateTimePipe;
//# sourceMappingURL=pipes.pipe.js.map