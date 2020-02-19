import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SoundService {
    private sounds : any
    constructor(private http: Http) {
        this.http.get('/Content/sounds.json')
            .subscribe(json => this.sounds = JSON.parse(json.text()));
    }

    beep(sound: string): void {
        let snd = new Audio("data:audio/wav;base64," + this.sounds[sound]);
        snd.play();
    }
} 