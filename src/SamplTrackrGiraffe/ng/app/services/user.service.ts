import { Injectable } from '@angular/core';
import { User } from '../types';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    private usersUrl = 'api/users';
    
    constructor(private http: Http){}

    getUsers() : Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map((res:Response) => res.json())
            .catch((error:any)  => Observable.throw(error.json().error || 'Server error'));
    }

    upsertUser(user : User) : Observable<any> {
        console.log('in service');
        const url = `api/user/${user.UserId}`;
        console.log(url);
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options    = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using put request
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    
    }
}