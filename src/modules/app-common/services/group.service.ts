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
    regTypes = ['Individual', 'Group'];

    addGroup(name: string, eventId: number, regType: number): Observable<Object> {
        let frmData: FormData = new FormData();
        frmData.append('name', name);
        frmData.append('eventId', eventId.toString());
        frmData.append('registration_type', regType.toString());

        return this.http.post(`${environment.base_url}Group/?format=json`, frmData);
    }
    getGroups(eventId: number): Observable<Group[]> {
        return this.http
            .get<Group[]>(`${environment.base_url}Group/?format=json&eventId=` + eventId)
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
