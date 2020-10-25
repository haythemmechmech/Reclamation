import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReclamationReclamationModule } from './reclamation/reclamation.module';
import { ReclamationNm_EtatModule } from './nm-etat/nm-etat.module';
import { ReclamationNm_PhaseModule } from './nm-phase/nm-phase.module';
import { ReclamationNm_TypeReclamationModule } from './nm-type-reclamation/nm-type-reclamation.module';
import { ReclamationActionModule } from './action/action.module';
import { ReclamationHistoriqueReclamationModule } from './historique-reclamation/historique-reclamation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ReclamationReclamationModule,
        ReclamationNm_EtatModule,
        ReclamationNm_PhaseModule,
        ReclamationNm_TypeReclamationModule,
        ReclamationActionModule,
        ReclamationHistoriqueReclamationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReclamationEntityModule {}
