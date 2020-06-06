import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../app-common/services/user.service';
import { AuthService } from '@modules/app-common/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/models';

@Component({
    selector: 'sb-top-nav-user',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        private router: Router,
        public userService: UserService,
        public authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.authService.currentUser.subscribe(
            x => {
                this.currentUser = x;
                // console.log('rcvd:', x);
            },
            err => console.error(err)
        );
    }
    currentUser: User;

    ngOnInit() {}
    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
