import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GroupService } from '../../../app-common/services/group.service';
import { ParticipantsService } from '../../../app-common/services/participants.service';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    ViewChildren,
    QueryList,
    EventEmitter,
    Output,
} from '@angular/core';
import { EventService } from '../../../app-common/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sb-preview-registration',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './preview-registration.component.html',
    styleUrls: ['preview-registration.component.scss'],
})
export class PreviewComponent implements OnInit {
    @Input() regTypeForm: FormGroup;
    @Input() registrationForm: FormGroup;
    @Input() oneImageExists: boolean;
    @Input() modalService: NgbModal;
    @Output() onSumbitPreview: EventEmitter<any> = new EventEmitter();

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    // total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @Input() pageSize = 4;

    closeResult = '';

    constructor() {}

    open(content) {
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
            .result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    if (result == 'Save click') {
                        // alert('hi');
                        this.onSumbitPreview.emit(null);
                    }
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    // alert(reason);
                }
            );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    get usersArray() {
        return this.registrationForm.get('users') as FormArray;
    }

    ngOnInit(): void {}
}
