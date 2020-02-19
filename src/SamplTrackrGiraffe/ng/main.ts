import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/modules/app.module';
/*import {enableProdMode} from '@angular/core';
enableProdMode();*/

platformBrowserDynamic().bootstrapModule(AppModule);

declare global {
    interface Date {
        toShortDateTimeString(): String;
    }
}

Date.prototype.toShortDateTimeString = function (): String {
    let dd = ('0' + (this.getDate().toString())).substr(-2);
    let mm = ('0' + ((this.getMonth() + 1).toString())).substr(-2);
    let yy = (this.getFullYear().toString()).substr(-2);
    let hh = ('0' + (this.getHours().toString())).substr(-2);
    let mins = ('0' + (this.getMinutes().toString())).substr(-2);
    return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + mins;
}