import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReclamationSharedModule } from 'app/shared';
import {
    ReclamationComponent,
    ReclamationDetailComponent,
    ReclamationUpdateComponent,
    ReclamationDeletePopupComponent,
    ReclamationDeleteDialogComponent,
    reclamationRoute,
    reclamationPopupRoute
} from './';

const ENTITY_STATES = [...reclamationRoute, ...reclamationPopupRoute];

@NgModule({
    imports: [ReclamationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReclamationComponent,
        ReclamationDetailComponent,
        ReclamationUpdateComponent,
        ReclamationDeleteDialogComponent,
        ReclamationDeletePopupComponent
    ],
    entryComponents: [ReclamationComponent, ReclamationUpdateComponent, ReclamationDeleteDialogComponent, ReclamationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationReclamationModule {}
