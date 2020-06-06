import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { SideNavData } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-layout-dashboard',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();

    sideNavItems;
    sideNavSections;
    sidenavStyle = 'sb-sidenav-light';
    sideNavData;

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService
    ) {
        this.sideNavData = new SideNavData();
        this.sideNavItems = this.sideNavData.sideNavItems(authService.isCurrentLoggedIn());
        this.sideNavSections = this.sideNavData.sideNavSections(authService.isCurrentLoggedIn());
        console.log(this.sideNavItems);
        console.log(this.sideNavSections);
    }
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
