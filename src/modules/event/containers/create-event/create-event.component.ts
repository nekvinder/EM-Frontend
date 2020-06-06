import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../../../models/models';

@Component({
    selector: 'sb-create-event',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './create-event.component.html',
    styleUrls: ['create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
    eventId: number;
    eventOld: Event;
    eventForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        start: new FormControl(),
        end: new FormControl(),
    });
    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));
        // alert(this.eventId);
        this.route.queryParams.subscribe((params: Params) => {
            // console.log('dede', params);
            if (this.eventId) {
                // this.eventId = params['id'];
                eventService.getEvent(this.eventId).subscribe(val => {
                    this.eventOld = val;
                    console.log('dede', val);
                    this.eventForm.setValue({
                        name: val.name,
                        description: val.description,
                        start: val.start.toString().slice(0, -1),
                        end: val.end.toString().slice(0, -1),
                    });
                });
            }
        });
    }
    getFormValidationErrors() {
        Object.keys(this.eventForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.eventForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log(
                        'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
                        controlErrors[keyError]
                    );
                });
            }
        });
    }

    ngOnInit(): void {}

    createEvent() {
        if (this.eventId) {
            this.eventOld.name = this.eventForm.get('name').value;
            this.eventOld.description = this.eventForm.get('description').value;
            this.eventOld.start = this.eventForm.get('start').value;
            this.eventOld.end = this.eventForm.get('end').value;

            this.eventService
                .updateEvent(this.eventOld)
                .toPromise()
                .then(res => {
                    alert('Event Updated.');
                    this.eventForm.reset();
                    this.router.navigate(['../']);
                });
        } else {
            this.eventService
                .addEvent(this.eventForm.value)
                .toPromise()
                .then(res => {
                    alert('Event Added.');
                    this.eventForm.reset();
                });
        }
    }
}
