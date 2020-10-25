import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';
import { Principal } from 'app/core';
import { HistoriqueReclamationService } from './historique-reclamation.service';

@Component({
    selector: 'jhi-historique-reclamation',
    templateUrl: './historique-reclamation.component.html'
})
export class HistoriqueReclamationComponent implements OnInit, OnDestroy {
    historiqueReclamations: IHistoriqueReclamation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private historiqueReclamationService: HistoriqueReclamationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.historiqueReclamationService.query().subscribe(
            (res: HttpResponse<IHistoriqueReclamation[]>) => {
                this.historiqueReclamations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHistoriqueReclamations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHistoriqueReclamation) {
        return item.id;
    }

    registerChangeInHistoriqueReclamations() {
        this.eventSubscriber = this.eventManager.subscribe('historiqueReclamationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
