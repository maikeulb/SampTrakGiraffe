import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'escape' })
export class EscapePipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
        return value.replace('\'', '');
    }
}

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
        let len = +args[0];
        return value.substr(0, len) + '...';
    }
}

@Pipe({ name: 'toShortDateTime' })
export class ToShortDateTimePipe implements PipeTransform {
    transform(value: Date, args: string[]): any {
        if (!value) return value;
        return value.toShortDateTimeString();
    }
}