import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    ValidatorFn,
    ValidationErrors,
    AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
// import { UserService } from ' /user.service';
import { debounceTime, map } from 'rxjs/operators';
import { User } from '../../../models/models';
import { Router } from '@angular/router';
import { UserService } from '../../../app-common/services/user.service';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}

    pwdCheckValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const pwd1 = control.get('password');
        const pwd2 = control.get('password2');

        return pwd1 && pwd2 && pwd1.value != pwd2.value ? { diffrentPasswords: true } : null;
    };

    validateUniqueUserName({ value }: AbstractControl): Observable<ValidationErrors | null> {
        return this.userService.validateUsername(value).pipe(
            debounceTime(1000),
            map((users: User[]) => {
                if (users.length > 0) {
                    // console.log('debig 1235', users);
                    return { isUsernameExists: true };
                }
                // console.log('debig 1234');
                return null;
            })
        );
    }
    getAllErrors() {
        const result = [];
        Object.keys(this.registerForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
            if (controlErrors) {
                Object.keys(controlErrors).forEach(keyError => {
                    result.push({
                        control: key,
                        error: keyError,
                        value: controlErrors[keyError],
                    });
                });
            }
        });

        return result;
    }

    registerForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),

            email: new FormControl('', Validators.required, this.validateUniqueUserName.bind(this)),
            password: new FormControl('', Validators.required),
            password2: new FormControl('', Validators.required),
        },
        { validators: this.pwdCheckValidator }
    );
    submitForm() {
        this.userService
            .register(this.registerForm.value)
            .toPromise()
            .then(res => {
                alert('User Registered. Please login now.');
                this.router.navigate(['auth/login']);
            });
    }
    ngOnInit() {}
}
