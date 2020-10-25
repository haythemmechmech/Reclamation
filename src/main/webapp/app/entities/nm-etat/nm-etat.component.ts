import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INm_Etat } from 'app/shared/model/nm-etat.model';
import { Principal } from 'app/core';
import { Nm_EtatService } from './nm-etat.service';

@Component({
    selector: 'jhi-nm-etat',
    templateUrl: './nm-etat.component.html'
})
export class Nm_EtatComponent implements OnInit, OnDestroy {
    nm_Etats: INm_Etat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nm_EtatService: Nm_EtatService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.nm_EtatService.query().subscribe(
            (res: HttpResponse<INm_Etat[]>) => {
                this.nm_Etats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNm_Etats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INm_Etat) {
        return item.id;
    }

    registerChangeInNm_Etats() {
        this.eventSubscriber = this.eventManager.subscribe('nm_EtatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
