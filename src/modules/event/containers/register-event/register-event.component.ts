import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GroupService } from '../../../app-common/services/group.service';
import { ParticipantsService } from '../../../app-common/services/participants.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewComponent } from '../preview-registration/preview-registration.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-register-event',
    // // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register-event.component.html',
    styleUrls: ['register-event.component.scss'],
})
export class RegisterEventComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private participantsService: ParticipantsService,
        private groupsService: GroupService,
        public modalService: NgbModal
    ) {}
    @ViewChild(PreviewComponent) preview: PreviewComponent;

    regTypes = this.participantsService.regTypes;
    selectedFile: ImageSnippet;
    oneImageExists: boolean = false;

    regTypeForm = new FormGroup({
        regType: new FormControl('Individual', Validators.required),
        participantNum: new FormControl(1, Validators.required),
        groupName: new FormControl('', Validators.required),
    });

    get usersArray() {
        return this.registrationForm.get('users') as FormArray;
    }

    getUserFormGroup(): FormGroup {
        return new FormGroup({
            fullname: new FormControl('', Validators.required),
            mobile: new FormControl('', [
                Validators.required,
                Validators.maxLength(10),
                Validators.minLength(10),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            idcardurl: new FormControl(),
            idcardimagesrc: new FormControl(),
            group_id: new FormControl(''),
            registration_type: new FormControl(),
        });
    }

    registrationForm = new FormGroup({
        users: new FormArray([this.getUserFormGroup()]),
    });

    regTypeChanged() {
        let participantNum = parseInt(this.regTypeForm.controls['participantNum'].value);
        let selectedregType = this.participantsService.regTypes.indexOf(
            this.regTypeForm.controls['regType'].value
        );
        let arrayLen = this.usersArray.controls.length;

        if (arrayLen > participantNum) {
            for (let index = 0; index < arrayLen - participantNum; index++) {
                this.usersArray.removeAt(this.usersArray.controls.length - 1);
            }
        } else if (arrayLen < participantNum) {
            for (let index = 0; index < participantNum - arrayLen; index++) {
                this.usersArray.push(this.getUserFormGroup());
            }
        }
        this.usersArray.controls.forEach(element => {
            element.get('registration_type').setValue(selectedregType);
        });
    }

    submitForm() {
        // if (!this.regTypeForm.valid) {
        //     alert('Please enter group name');
        //     return;
        // }
        let selectedregType = this.participantsService.regTypes.indexOf(
            this.regTypeForm.controls['regType'].value
        );
        this.groupsService
            .addGroup(this.regTypeForm.get('groupName').value, this.eventId, selectedregType)
            .toPromise()
            .then(res => {
                let usersSubsArray = [];
                let groupId = res['id'];
                this.usersArray.controls.forEach(element => {
                    element.get('group_id').setValue(groupId);
                    console.log('debig 889', element.value);
                    usersSubsArray.push(this.participantsService.addUser(element.value));
                });

                forkJoin(usersSubsArray).subscribe(results => {
                    let regId = results[0]['group_id'];
                    alert('Registration Succesful. You Registration Id is ' + regId);
                    this.router.navigate(['']);
                });
            })
            .catch(err => console.error(err));
    }
    eventId;
    ngOnInit(): void {
        this.eventId = this.route.snapshot.paramMap.get('id');

        let selectedregType = this.participantsService.regTypes.indexOf(
            this.regTypeForm.controls['regType'].value
        );
        this.usersArray.controls.forEach(element => {
            element.get('registration_type').setValue(selectedregType);
        });
    }

    processFile(imageInput: any, user: FormGroup) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);

            this.participantsService.addUserImage(this.selectedFile.file).subscribe(
                res => {
                    user.get('idcardimagesrc').setValue(res['imagepath']);
                    this.oneImageExists = true;
                },
                err => {
                    console.error(err);
                }
            );
        });
        reader.readAsDataURL(file);
    }
}

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';

    constructor(public src: string, public file: File) {}
}
