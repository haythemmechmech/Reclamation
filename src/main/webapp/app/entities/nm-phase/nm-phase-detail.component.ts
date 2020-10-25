import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INm_Phase } from 'app/shared/model/nm-phase.model';

@Component({
    selector: 'jhi-nm-phase-detail',
    templateUrl: './nm-phase-detail.component.html'
})
export class Nm_PhaseDetailComponent implements OnInit {
    nm_Phase: INm_Phase;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_Phase }) => {
            this.nm_Phase = nm_Phase;
        });
    }

    previousState() {
        window.history.back();
    }
}
