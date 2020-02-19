import { Injectable } from '@angular/core';
import { Container, ContainerType } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class ContainerService {
    private containersUrl = 'api/containers';
    private containerTypesUrl = 'api/containertypes';
    
    constructor(private http: Http){}

    getContainers() : Observable<Container[]> {
        return this.http.get(this.containersUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getContainerByLocationId(id : Number) : Observable<Container[]> {
        const url = `api/containers/${id}`;
        return this.http.get(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getContainerTypes(): Observable<ContainerType[]> {
        return this.http.get(this.containerTypesUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveContainer(cnt: Container): Observable<number> {
        return this.http.post(this.containersUrl,cnt)
            .map((res: Response) => +res.text())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}