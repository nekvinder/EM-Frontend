import { ChangeDetectionStrategy, Component, Input, OnInit, HostListener } from '@angular/core';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-side-nav-item',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;
    @Input() navigationService!: NavigationService;

    innerWidth;
    @HostListener('window:resize', ['$event'])
    onresize(event) {
        console.log(this.innerWidth);
        this.innerWidth = window.innerWidth;
    }

    expanded = false;
    routeData!: SBRouteData;

    constructor() {}
    toggleSideNav() {
        this.expanded = !this.expanded;
        if (!this.sideNavItem.submenu && this.innerWidth < 991) {
            this.navigationService.toggleSideNav();
        }
    }
    ngOnInit() {}
}
