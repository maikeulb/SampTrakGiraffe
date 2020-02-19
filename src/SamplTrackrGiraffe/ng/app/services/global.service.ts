import { Injectable } from '@angular/core';
import { Location, Context, Container, ContainerType } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
//import { LocationService } from './location.service';
import { Observable } from 'rxjs/Rx'

//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class GlobalsService {
  private isLocal: boolean;

  get IsLocal(): boolean {
    return this.isLocal;
  }

  set IsLocal(isLocal: boolean) {
    this.isLocal = isLocal;
    this.isLocal = this.isLocal === undefined ? false : this.isLocal;
    const url = `api/context/${this.isLocal}`;
    this.http.get(url)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe((r: Response) => {
        this.isLocal = r.json()
        console.log('in global svc - ' + this.isLocal);
        //window.location.reload(true)
      })
  }

  private context: Context;
  get Context(): Context {
    return this.context;
  }

  constructor(
    private http: Http,
    //private locationService: LocationService
  ) { }

  getContext(): Observable<void> {
    //sessionStorage.setItem("source", JSON.stringify(source));
    return this.http.get(`api/context`)
      .catch(
      (error: any) => Observable.throw(error.json().error || 'Server error'))
      .map((res: Response) => {
        console.log(res)
        this.context = res.json(); console.log('svc', this.Context);
        return;
      });
  }
}
