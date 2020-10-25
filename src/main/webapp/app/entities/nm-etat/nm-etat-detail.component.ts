import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INm_Etat } from 'app/shared/model/nm-etat.model';

@Component({
    selector: 'jhi-nm-etat-detail',
    templateUrl: './nm-etat-detail.component.html'
})
export class Nm_EtatDetailComponent implements OnInit {
    nm_Etat: INm_Etat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_Etat }) => {
            this.nm_Etat = nm_Etat;
        });
    }

    previousState() {
        window.history.back();
    }
}
