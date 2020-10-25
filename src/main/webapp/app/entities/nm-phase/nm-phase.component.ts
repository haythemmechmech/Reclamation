import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INm_Phase } from 'app/shared/model/nm-phase.model';
import { Principal } from 'app/core';
import { Nm_PhaseService } from './nm-phase.service';

@Component({
    selector: 'jhi-nm-phase',
    templateUrl: './nm-phase.component.html'
})
export class Nm_PhaseComponent implements OnInit, OnDestroy {
    nm_Phases: INm_Phase[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nm_PhaseService: Nm_PhaseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.nm_PhaseService.query().subscribe(
            (res: HttpResponse<INm_Phase[]>) => {
                this.nm_Phases = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNm_Phases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INm_Phase) {
        return item.id;
    }

    registerChangeInNm_Phases() {
        this.eventSubscriber = this.eventManager.subscribe('nm_PhaseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
