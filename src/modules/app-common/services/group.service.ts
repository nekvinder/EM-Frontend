import { map } from 'rxjs/operators';
import { Participant, Group } from '../../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    constructor(private http: HttpClient) {}

    addGroup(name: string, eventId: number): Observable<Object> {
        let frmData: FormData = new FormData();
        frmData.append('name', name);
        frmData.append('eventId', eventId.toString());

        return this.http.post(`${environment.base_url}Group/?format=json`, frmData);
    }
    getGroups(): Observable<Group[]> {
        return this.http
            .get<Group[]>(`${environment.base_url}Group/?format=json`)
            .pipe(map(res => res));
    }

    getParticipantsOfGroup(group: Group): Observable<Participant[]> {
        return this.http
            .get<Participant[]>(
                `${environment.base_url}registration/?format=json&group_id=` + group.id
            )
            .pipe(map(res => res));
    }
}
