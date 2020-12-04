import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@modules/app-common/services/auth.service';

import { UserService } from '../../../app-common/services/user.service';

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
        email: new FormControl('nekvinder@gmail.com', Validators.required),
        password: new FormControl('nekvinder', Validators.required),
    });

    submitForm() {
        const userid: string | null = this.loginForm.get('email')!.value;
        const pass: string | null = this.loginForm.get('password')!.value;
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
