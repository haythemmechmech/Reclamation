import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReclamationSharedModule } from 'app/shared';
import {
    Nm_TypeReclamationComponent,
    Nm_TypeReclamationDetailComponent,
    Nm_TypeReclamationUpdateComponent,
    Nm_TypeReclamationDeletePopupComponent,
    Nm_TypeReclamationDeleteDialogComponent,
    nm_TypeReclamationRoute,
    nm_TypeReclamationPopupRoute
} from './';

const ENTITY_STATES = [...nm_TypeReclamationRoute, ...nm_TypeReclamationPopupRoute];

@NgModule({
    imports: [ReclamationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Nm_TypeReclamationComponent,
        Nm_TypeReclamationDetailComponent,
        Nm_TypeReclamationUpdateComponent,
        Nm_TypeReclamationDeleteDialogComponent,
        Nm_TypeReclamationDeletePopupComponent
    ],
    entryComponents: [
        Nm_TypeReclamationComponent,
        Nm_TypeReclamationUpdateComponent,
        Nm_TypeReclamationDeleteDialogComponent,
        Nm_TypeReclamationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationNm_TypeReclamationModule {}
