/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
//
/* Module */
import { EventModule } from './event.module';

/* Containers */
import * as eventContainers from './containers';

/* Guards */
// import * as eventGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: eventContainers.CreateEventComponent,
        data: {
            title: 'Create Event',
        } as SBRouteData,
    },
    {
        path: 'create/:id',
        canActivate: [AuthGuard],
        component: eventContainers.CreateEventComponent,
        data: {
            title: 'Update Event',
        } as SBRouteData,
    },
    {
        path: 'list',
        canActivate: [],
        component: eventContainers.ListEventComponent,
        data: {
            title: 'Events',
        } as SBRouteData,
    },
    {
        path: 'register/:id',
        canActivate: [],
        component: eventContainers.RegisterEventComponent,
        data: {
            title: 'Register',
        } as SBRouteData,
    },
    {
        path: 'view/:id',
        canActivate: [AuthGuard],
        component: eventContainers.ViewEventComponent,
        data: {
            title: 'View Event',
        } as SBRouteData,
    },
    {
        path: 'view-registrations/:id',
        canActivate: [AuthGuard],
        component: eventContainers.ViewEventComponent,
        data: {
            title: 'View Event',
        } as SBRouteData,
    },
    // {
    //     path: '401',
    //     canActivate: [],
    //     component: eventContainers.Event401Component,
    //     data: {
    //         title: 'Event 401 - SB Admin Angular',
    //     } as SBRouteData,
    // },
    // {
    //     path: '404',
    //     canActivate: [],
    //     component: eventContainers.Event404Component,
    //     data: {
    //         title: 'Event 404 - SB Admin Angular',
    //     } as SBRouteData,
    // },
    // {
    //     path: '500',
    //     canActivate: [],
    //     component: eventContainers.Event500Component,
    //     data: {
    //         title: 'Event 500 - SB Admin Angular',
    //     } as SBRouteData,
    // },
    // {
    //     path: '**',
    //     pathMatch: 'full',
    //     component: eventContainers.CreateEventComponent,
    // },
];

@NgModule({
    imports: [EventModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class EventRoutingModule {}
