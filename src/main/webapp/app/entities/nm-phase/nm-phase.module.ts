import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReclamationSharedModule } from 'app/shared';
import {
    Nm_PhaseComponent,
    Nm_PhaseDetailComponent,
    Nm_PhaseUpdateComponent,
    Nm_PhaseDeletePopupComponent,
    Nm_PhaseDeleteDialogComponent,
    nm_PhaseRoute,
    nm_PhasePopupRoute
} from './';

const ENTITY_STATES = [...nm_PhaseRoute, ...nm_PhasePopupRoute];

@NgModule({
    imports: [ReclamationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Nm_PhaseComponent,
        Nm_PhaseDetailComponent,
        Nm_PhaseUpdateComponent,
        Nm_PhaseDeleteDialogComponent,
        Nm_PhaseDeletePopupComponent
    ],
    entryComponents: [Nm_PhaseComponent, Nm_PhaseUpdateComponent, Nm_PhaseDeleteDialogComponent, Nm_PhaseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationNm_PhaseModule {}
