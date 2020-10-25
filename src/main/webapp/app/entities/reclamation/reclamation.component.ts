import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReclamation } from 'app/shared/model/reclamation.model';
import { Principal } from 'app/core';
import { ReclamationService } from './reclamation.service';

@Component({
    selector: 'jhi-reclamation',
    templateUrl: './reclamation.component.html'
})
export class ReclamationComponent implements OnInit, OnDestroy {
    reclamations: IReclamation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reclamationService: ReclamationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.reclamationService.query().subscribe(
            (res: HttpResponse<IReclamation[]>) => {
                this.reclamations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReclamations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReclamation) {
        return item.id;
    }

    registerChangeInReclamations() {
        this.eventSubscriber = this.eventManager.subscribe('reclamationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
