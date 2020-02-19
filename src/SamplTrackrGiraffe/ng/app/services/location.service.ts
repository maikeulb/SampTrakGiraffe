import { Injectable } from '@angular/core';
import { User, Location, Site, SiteLocationsDespatchLocation, LocationsDespatchLocation } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocationService {
  private locationsUrl = 'api/locations';
  private locationDespatchLocationsUrl = '/api/despatchlocations';
  constructor(private http: Http) { }

  getLocations(): Observable<Site[]> {
    return this.http.get(this.locationsUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getLocationsWithDespatchLocations(): Observable<SiteLocationsDespatchLocation[]> {
    return this.http.get(this.locationDespatchLocationsUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllSiteLocations(): Observable<Site[]> {
    return this.http.get('api/alllocations')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDespatchLoctions(): Observable<Location[]> {
    const url = `api/despatchlocationsforlocid`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getLocationByName(locName: string): Observable<Location> {
    const url = `api/location/${locName}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getLocationById(locId: number): Observable<Location> {
    const url = `api/location/${locId}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateDespatchLocations(locationId: number, despatchLocations: number[]) {
    const url = `api/despatchlocations/${locationId}`;
    console.log(url);
    let bodyString = JSON.stringify(despatchLocations); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(url, bodyString, options) // ...using post request
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  upsertLocation(location: Location): Observable<any> {
    console.log('in service');
    const url = `api/location/${location.LocationId}`;
    console.log(url);
    let bodyString = JSON.stringify(location); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(url, location, options) // ...using post request
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
