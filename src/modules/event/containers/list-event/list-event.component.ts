import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { GroupService } from '../../../app-common/services/group.service';
import { Event } from '../../../models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-list-event',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-event.component.html',
    styleUrls: ['list-event.component.scss'],
})
export class ListEventComponent implements OnInit, AfterViewInit {
    constructor(
        private eventService: EventService,
        private groupService: GroupService,
        public authService: AuthService
    ) {}
    events: Event[];

    ngOnInit(): void {}
    ngAfterViewInit() {
        // alert('a');
        this.eventService
            .getEvents()
            .toPromise()
            .then(ret => {
                this.events = ret;
                // alert(ret);
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
