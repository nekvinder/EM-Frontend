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
import { AuthService } from '@modules/app-common/services/auth.service';

@Component({
    selector: 'sb-layout-event',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-event.component.html',
    styleUrls: ['layout-event.component.scss'],
})
export class LayoutEventComponent implements OnInit, OnDestroy {
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
        authService.currentUser.subscribe(s => {
            // alert('called');
            this.sideNavItems = this.sideNavData.sideNavItems(s ? true : false);
            this.sideNavSections = this.sideNavData.sideNavSections(s ? true : false);
            this.changeDetectorRef.markForCheck();
        });
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
