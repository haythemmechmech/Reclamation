import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

@Component({
    selector: 'jhi-historique-reclamation-detail',
    templateUrl: './historique-reclamation-detail.component.html'
})
export class HistoriqueReclamationDetailComponent implements OnInit {
    historiqueReclamation: IHistoriqueReclamation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ historiqueReclamation }) => {
            this.historiqueReclamation = historiqueReclamation;
        });
    }

    previousState() {
        window.history.back();
    }
}
