import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';
import { UserService } from '../../../app-common/services/user.service';
import { AuthService } from '../../../app-common/services/auth.service';
import { User } from '../../../models/models';

@Component({
    selector: 'sb-side-nav',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        public authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => (this.currentUser = x));
        
    }
    currentUser: User;

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
