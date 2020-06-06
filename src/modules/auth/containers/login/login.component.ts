import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../app-common/services/user.service';
import { AuthService } from '@modules/app-common/services/auth.service';

@Component({
    selector: 'sb-login',
    // // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    submitForm() {
        let userid: string | null = this.loginForm.get('email')!.value;
        let pass: string | null = this.loginForm.get('password')!.value;
        if (userid && pass) {
            this.userService
                .login(userid, pass)
                .toPromise()
                .then(res => {
                    // console.log(res);
                    if (res) {
                        if (res.length > 0) {
                            // alert('logged in');
                            // console.log('debug 11', res);
                            this.authService.login(res[0]);

                            if (!this.route.snapshot.params.returnUrl) {
                                this.router.navigate(['/dashboard']);
                            } else {
                                this.router.navigate([
                                    this.route.snapshot.queryParamMap.get('returnUrl'),
                                ]);
                            }
                        } else {
                            alert('Error.Please Retry');
                        }
                    } else {
                        alert('Error.Please Retry');
                    }
                })
                .catch(err => console.error(err));
        } else {
            alert('Error.Please Retry');
        }
    }

    ngOnInit() {}
}
