import { map } from 'rxjs/operators';
import { Event } from '../../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    constructor(private http: HttpClient) {}

    getEvents(): Observable<Event[]> {
        return this.http
            .get<Event[]>(`${environment.base_url}Event/?format=json`)
            .pipe(map(res => res));
    }

    addEvent(formData: FormData): Observable<Object> {
        return this.http.post(`${environment.base_url}Event/?format=json`, formData);
    }
}
