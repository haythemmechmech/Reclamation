import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

@Component({
    selector: 'jhi-nm-type-reclamation-detail',
    templateUrl: './nm-type-reclamation-detail.component.html'
})
export class Nm_TypeReclamationDetailComponent implements OnInit {
    nm_TypeReclamation: INm_TypeReclamation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_TypeReclamation }) => {
            this.nm_TypeReclamation = nm_TypeReclamation;
        });
    }

    previousState() {
        window.history.back();
    }
}
