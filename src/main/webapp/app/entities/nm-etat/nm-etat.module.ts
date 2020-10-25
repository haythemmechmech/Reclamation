import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReclamationSharedModule } from 'app/shared';
import {
    Nm_EtatComponent,
    Nm_EtatDetailComponent,
    Nm_EtatUpdateComponent,
    Nm_EtatDeletePopupComponent,
    Nm_EtatDeleteDialogComponent,
    nm_EtatRoute,
    nm_EtatPopupRoute
} from './';

const ENTITY_STATES = [...nm_EtatRoute, ...nm_EtatPopupRoute];

@NgModule({
    imports: [ReclamationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Nm_EtatComponent,
        Nm_EtatDetailComponent,
        Nm_EtatUpdateComponent,
        Nm_EtatDeleteDialogComponent,
        Nm_EtatDeletePopupComponent
    ],
    entryComponents: [Nm_EtatComponent, Nm_EtatUpdateComponent, Nm_EtatDeleteDialogComponent, Nm_EtatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationNm_EtatModule {}
