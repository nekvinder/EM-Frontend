import { ViewEventComponent } from './view-event/view-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventComponent } from './list-event/list-event.component';
import { RegisterEventComponent } from './register-event/register-event.component';
import { PreviewComponent } from './preview-registration/preview-registration.component';

// import { Error404Component } from './error-404/error-404.component';
// import { Error500Component } from './error-500/error-500.component';

export const containers = [
    CreateEventComponent,
    ViewEventComponent,
    PreviewComponent,
    ListEventComponent,
    RegisterEventComponent,
];

export * from './create-event/create-event.component';
export * from './list-event/list-event.component';
export * from './register-event/register-event.component';
export * from './preview-registration/preview-registration.component';
export * from './view-event/view-event.component';

// export * from './error-404/error-404.component';
// export * from './error-500/error-500.component';
