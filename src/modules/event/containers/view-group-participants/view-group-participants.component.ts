import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GroupService } from '../../../app-common/services/group.service';
import { ParticipantsService } from '../../../app-common/services/participants.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewComponent } from '../preview-registration/preview-registration.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group, Participant, IdCard } from '../../../models/models';

@Component({
    selector: 'sb-view-group-participants',
    // // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './view-group-participants.component.html',
    styleUrls: ['view-group-participants.component.scss'],
})
export class ViewParticipantsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private participantsService: ParticipantsService,
        private groupsService: GroupService
    ) {
        this.groupId = this.route.snapshot.paramMap.get('groupId');
        this.groupsService
            .getGroup(this.groupId)
            .toPromise()
            .then(val => {
                val.registration_type_value = this.groupsService.regTypes[val.registration_type];
                this.groupsService
                    .getParticipantsOfGroup(val)
                    .toPromise()
                    .then(s => {
                        val.participants = s;
                        this.group = val;
                    });
                // console.log('ca', val);
            });
        // this.eventId = this.route.snapshot.paramMap.get('eventId');
    }

    groupId;
    public group: Group;

    // eventId;
    ngOnInit(): void {}
}
