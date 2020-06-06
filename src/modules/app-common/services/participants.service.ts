import { map } from 'rxjs/operators';
import { Participant, IdCard } from '../../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ParticipantsService {
    constructor(private http: HttpClient) {}
    public regTypes = ['Individual', 'Group'];

    getUsers(): Observable<Participant[]> {
        return this.http
            .get<Participant[]>(`${environment.base_url}registration/?format=json`)
            .pipe(map(res => res));
    }

    addUser(formData: FormData): Observable<Object> {
        return this.http.post(`${environment.base_url}registration/?format=json`, formData);
    }

    addUserImage(image: File): Observable<Object> {
        const formData = new FormData();
        formData.append('imagepath', image);
        return this.http.post(`${environment.base_url}IdCard/?format=json`, formData);
    }

    getImage(id: number): Observable<IdCard> {
        return this.http
            .get<IdCard>(`${environment.base_url}IdCard/${id}/?format=json`)
            .pipe(map(res => res));
        // const formData = new FormData();
        // formData.append('imagepath', image);
        // return this.http.post(`${environment.base_url}IdCard/?format=json`, formData);
    }
}
