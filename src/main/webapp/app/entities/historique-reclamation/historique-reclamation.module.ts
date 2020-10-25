import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReclamationSharedModule } from 'app/shared';
import {
    HistoriqueReclamationComponent,
    HistoriqueReclamationDetailComponent,
    HistoriqueReclamationUpdateComponent,
    HistoriqueReclamationDeletePopupComponent,
    HistoriqueReclamationDeleteDialogComponent,
    historiqueReclamationRoute,
    historiqueReclamationPopupRoute
} from './';

const ENTITY_STATES = [...historiqueReclamationRoute, ...historiqueReclamationPopupRoute];

@NgModule({
    imports: [ReclamationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HistoriqueReclamationComponent,
        HistoriqueReclamationDetailComponent,
        HistoriqueReclamationUpdateComponent,
        HistoriqueReclamationDeleteDialogComponent,
        HistoriqueReclamationDeletePopupComponent
    ],
    entryComponents: [
        HistoriqueReclamationComponent,
        HistoriqueReclamationUpdateComponent,
        HistoriqueReclamationDeleteDialogComponent,
        HistoriqueReclamationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationHistoriqueReclamationModule {}
