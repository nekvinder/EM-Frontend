import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    login(email: string, pass: string): Observable<User[]> {
        // environment;
        let url = `${environment.base_url}Login/?format=json&email=${email}&password=` + pass;
        console.log(url);
        return this.http.get<User[]>(url).pipe(map(res => res));
    }

    register(formData: FormData): Observable<Object> {
        return this.http.post(`${environment.base_url}Login/?format=json`, formData);
    }

    validateUsername(email: string): Observable<User[]> {
        return this.http.get<User[]>(environment.base_url + `Login/?format=json&email=` + email);
    }
}
