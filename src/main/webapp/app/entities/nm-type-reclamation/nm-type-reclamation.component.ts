import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';
import { Principal } from 'app/core';
import { Nm_TypeReclamationService } from './nm-type-reclamation.service';

@Component({
    selector: 'jhi-nm-type-reclamation',
    templateUrl: './nm-type-reclamation.component.html'
})
export class Nm_TypeReclamationComponent implements OnInit, OnDestroy {
    nm_TypeReclamations: INm_TypeReclamation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nm_TypeReclamationService: Nm_TypeReclamationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.nm_TypeReclamationService.query().subscribe(
            (res: HttpResponse<INm_TypeReclamation[]>) => {
                this.nm_TypeReclamations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNm_TypeReclamations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INm_TypeReclamation) {
        return item.id;
    }

    registerChangeInNm_TypeReclamations() {
        this.eventSubscriber = this.eventManager.subscribe('nm_TypeReclamationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
