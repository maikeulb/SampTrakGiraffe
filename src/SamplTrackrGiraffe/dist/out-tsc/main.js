"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/modules/app.module");
/*import {enableProdMode} from '@angular/core';
enableProdMode();*/
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
Date.prototype.toShortDateTimeString = function () {
    var dd = ('0' + (this.getDate().toString())).substr(-2);
    var mm = ('0' + ((this.getMonth() + 1).toString())).substr(-2);
    var yy = (this.getFullYear().toString()).substr(-2);
    var hh = ('0' + (this.getHours().toString())).substr(-2);
    var mins = ('0' + (this.getMinutes().toString())).substr(-2);
    return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + mins;
};
//# sourceMappingURL=main.js.map