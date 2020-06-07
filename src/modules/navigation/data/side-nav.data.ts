import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { AuthService } from '@modules/app-common/services/auth.service';

export class SideNavData {
    public sideNavSections(isLoggedIn: boolean): SideNavSection[] {
        return [
            {
                text: 'Events',
                items: ['dashboard', 'events'],
            },
            // {
            //     text: 'Admin',
            //     items: ['layouts', 'pages'],
            // },
            {
                text: 'Help',
                items: ['documentation', 'about'],
            },
        ];
    }

    public sideNavItems(isLoggedIn: boolean): SideNavItems {
        return {
            dashboard: {
                icon: 'tachometer-alt',
                text: 'Dashboard',
                link: '/dashboard',
            },
            events: {
                icon: 'calendar-alt',
                text: 'Events',
                submenu: [
                    {
                        icon: 'calendar-plus',
                        text: 'Create Event',
                        link: '/events/create',
                        isHidden: !isLoggedIn,
                    },
                    {
                        icon: 'calendar-check',
                        text: 'List Events',
                        link: '/events/list',
                    },
                ],
            },

            documentation: {
                icon: 'info-circle',
                text: 'Guide',
                link: '/dashboard/guide',
            },
            about: {
                icon: 'address-card',
                text: 'About Us',
                link: '/dashboard/about',
            },

            layouts: {
                icon: 'columns',
                text: 'Layouts',
                submenu: [
                    {
                        text: 'Static Navigation',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Light Sidenav',
                        link: '/dashboard/light',
                    },
                ],
            },
            pages: {
                icon: 'book-open',
                text: 'Pages',
                submenu: [
                    {
                        text: 'Authentication',
                        submenu: [
                            {
                                text: 'Login',
                                link: '/auth/login',
                            },
                            {
                                text: 'Register',
                                link: '/auth/register',
                            },
                            {
                                text: 'Forgot Password',
                                link: '/auth/forgot-password',
                            },
                        ],
                    },
                    {
                        text: 'Error',
                        submenu: [
                            {
                                text: '401 Page',
                                link: '/error/401',
                            },
                            {
                                text: '404 Page',
                                link: '/error/404',
                            },
                            {
                                text: '500 Page',
                                link: '/error/500',
                            },
                        ],
                    },
                ],
            },
            charts: {
                icon: 'chart-area',
                text: 'Charts',
                link: '/charts',
            },
            tables: {
                icon: 'table',
                text: 'Tables',
                link: '/tables',
            },
        };
    }
}
