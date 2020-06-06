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
            .get<Event[]>(`${environment.base_url}Event/?format=json&active=true`)
            .pipe(map(res => res));
    }

    getEvent(eventId): Observable<Event> {
        return this.http
            .get<Event>(`${environment.base_url}Event/${eventId}/?format=json`)
            .pipe(map(res => res));
    }

    addEvent(formData: FormData): Observable<Object> {
        return this.http.post(`${environment.base_url}Event/?format=json`, formData);
    }

    // deleteEvent(eventId: number): Observable<Object> {
    //     return this.http.delete(`${environment.base_url}Event/${eventId}/?format=json`);
    // }

    deleteEvent(event: Event): Observable<Object> {
        event.active = false;
        return this.http.put(`${environment.base_url}Event/${event.id}/?format=json`, event);
    }

    updateEvent(event: Event): Observable<Object> {
        // event.active = false;
        return this.http.put(`${environment.base_url}Event/${event.id}/?format=json`, event);
    }
}
