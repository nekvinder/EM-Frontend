import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';

@Component({
    selector: 'sb-create-event',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './create-event.component.html',
    styleUrls: ['create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
    constructor(private eventService: EventService) {}
    eventForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        start: new FormControl(),
        end: new FormControl(),
    });
    ngOnInit(): void {}

    createEvent() {
        this.eventService
            .addEvent(this.eventForm.value)
            .toPromise()
            .then(res => {
                alert('Event Added.');
                this.eventForm.reset();
            });
    }
}
