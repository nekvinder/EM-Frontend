import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { GroupService } from '../../../app-common/services/group.service';
import { Event, Group, Participant, User, IdCard } from '../../../models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipantsService } from '../../../app-common/services/participants.service';
import { forkJoin, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-view-event',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './view-event.component.html',
    styleUrls: ['view-event.component.scss'],
})
export class ViewEventComponent implements OnInit, AfterViewInit {
    constructor(
        private participantsService: ParticipantsService,
        public modalService: NgbModal,
        private eventService: EventService,
        private groupService: GroupService,
        private route: ActivatedRoute
    ) {}
    groups: Group[];
    eventId;
    regTypes = this.participantsService.regTypes;

    ngOnInit(): void {
        this.eventId = this.route.snapshot.paramMap.get('id');
    }

    async getUserFormGroup(participant: Participant): Promise<FormGroup> {
        const imgsrc = <IdCard>(
            await this.participantsService.getImage(participant.idcard).toPromise()
        );

        return new FormGroup({
            fullname: new FormControl(participant.fullname),
            mobile: new FormControl(participant.mobile),
            email: new FormControl(participant.email),
            idcardurl: new FormControl(participant.idcard),
            idcardimagesrc: new FormControl(imgsrc.imagepath),
            group_id: new FormControl(participant.group_id),
            registration_type: new FormControl(participant.registration_type),
        });
    }

    makeRegistrationForm(group: Group): FormGroup {
        let frm = new FormGroup({
            users: new FormArray([]),
        });
        if (group.participants) {
            group.participants.forEach(value => {
                this.getUserFormGroup(value).then(val => {
                    (<FormArray>frm.get('users')).push(val);
                });
            });
        }
        return frm;
    }

    makeRegTypeForm(group: Group): FormGroup {
        let frm = new FormGroup({
            groupName: new FormControl(group.name),
        });
        if (group.participants) {
            frm.addControl(
                'regType',
                new FormControl(this.regTypes[group.participants[0].registration_type])
            );
            frm.addControl('participantNum', new FormControl(group.participants.length));
        }

        return frm;
    }

    ngAfterViewInit() {
        this.groupService
            .getGroups(this.eventId)
            .toPromise()
            .then(ret => {
                let usersSubsArray: Observable<Participant[]>[] = [];
                this.groups = ret;
                this.groups.forEach(element => {
                    usersSubsArray.push(this.groupService.getParticipantsOfGroup(element));
                });
                forkJoin(usersSubsArray).subscribe(result => {
                    let i = 0;
                    this.groups.forEach(element => {
                        element.participants = result[i++];
                    });
                });
            });
    }

    copyMessage(val: string) {
        let url = window.location.href.split('/');
        url.pop();
        val = url.join('/') + '/register/' + val;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
