import { Injectable } from '@angular/core';
import { Sample, SampleAudit } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class SampleService {
    private samplesUrl = 'api/samples';
    
    constructor(private http: Http){}

    getSamplesByRackId(id: Number): Observable<Sample[]> {
        const url = `api/racksamples/${id}`;
        return this.http.get(url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    getSamplesByBoxId(id: Number): Observable<Sample[]> {
        const url = `api/boxsamples/${id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    
    getSampleAudits(sampno : string) : Observable<SampleAudit[]> {
        const url = `api/sampleaudit/${sampno}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    
    getBoxSampleAuditsByTrackingID (trackingId : string) : Observable<SampleAudit[]> {
        const url = `api/boxsampleaudits/${trackingId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    saveSample(samp: Sample): Observable<number> {
        return this.http.post(this.samplesUrl, samp)
            .map((res: Response) => +res.text())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    destroySample(samp: Sample): Observable<any> {
        const url = `api/sample/${samp.SampleId}`;
        return this.http.delete(url)
            .map((res: Response) => +res.text())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    destroySampleById(sampid: number): Observable<any> {
        const url = `api/sample/${sampid}`;
        return this.http.delete(url)
            .map((res: Response) => +res.text())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}