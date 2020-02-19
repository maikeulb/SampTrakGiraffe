import { Injectable } from '@angular/core';
import { Box, BoxType, BoxAudit } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class BoxService {
    private BoxsUrl = 'api/boxes';
    private BoxTypesUrl = 'api/boxtypes';
    
    constructor(private http: Http){}

    getBoxs() : Observable<Box[]> {
        return this.http.get(this.BoxsUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    getBoxByLocationId(id : Number) : Observable<Box[]> {
        const url = `api/boxes/${id}`;
        return this.http.get(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getChildBoxes(id: number): Observable<Box[]> {
        const url = `api/childboxes/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getBoxByBoxId(id: Number): Observable<Box> {
        const url = `api/box/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    printLabel (id: Number): Observable<Box> {
        const url = `api/boxlabel/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error._body || 'Server error'));
    }

    getBoxAudits(id:number) : Observable<BoxAudit[]> {
        const url = `api/boxaudit/${id}`;
        return this.http.get(url)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getBoxTypes(): Observable<BoxType[]> {
        return this.http.get(this.BoxTypesUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveBox(box: Box): Observable<Box> {
        return this.http.post(this.BoxsUrl,box)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    moveBoxSamples(startid: number, endid: number) : Observable<string> {
        const url = `api/moveboxsamples/${startid}/${endid}`;
        return this.http.post(url,null)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    packChildBox(box: Box): Observable<number> {
        return this.http.post('api/packchildbox', box)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }
}
