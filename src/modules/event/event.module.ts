/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TablesModule } from '@modules/tables/tables.module';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as eventComponents from './components';

/* Containers */
import * as eventContainers from './containers';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PreviewComponent } from './containers';

/* Guards */
// import * as eventGuards from './guards';

/* Services */
// import * as eventServices from './services';

@NgModule({
    imports: [
        CommonModule,
        TablesModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgbModalModule,
        AppCommonModule,
        NavigationModule,
    ],
    // providers: [...eventServices.services, ...eventGuards.guards],
    declarations: [...eventContainers.containers, ...eventComponents.components],
    exports: [...eventContainers.containers, ...eventComponents.components],
})
export class EventModule {}
