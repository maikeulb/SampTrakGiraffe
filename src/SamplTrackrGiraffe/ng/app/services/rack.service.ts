import { Injectable } from '@angular/core';
import { Rack,ContainerRack } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class RackService {
    private racksUrl = 'api/racks';
    
    constructor(private http: Http){}

    getRacks(): Observable<ContainerRack[]> {
        return this.http.get(this.racksUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRackById(id: number): Observable<Rack> {
        const url = `api/rack/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRackByContainerId(id: number): Observable<ContainerRack[]> {
        const url = `api/racks/${id}`;
        return this.http.get(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveRack(rak: any): Observable<number> {
        return this.http.post(this.racksUrl, rak)
            .map((res: Response) => +res.text())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
} 