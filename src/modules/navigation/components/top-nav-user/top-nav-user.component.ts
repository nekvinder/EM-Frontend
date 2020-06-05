import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../app-common/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        private router: Router,
        public userService: UserService,
        public authService: AuthService
    ) {}
    ngOnInit() {}
    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
