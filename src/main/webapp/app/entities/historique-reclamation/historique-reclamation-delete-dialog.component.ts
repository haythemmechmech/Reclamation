import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';
import { HistoriqueReclamationService } from './historique-reclamation.service';

@Component({
    selector: 'jhi-historique-reclamation-delete-dialog',
    templateUrl: './historique-reclamation-delete-dialog.component.html'
})
export class HistoriqueReclamationDeleteDialogComponent {
    historiqueReclamation: IHistoriqueReclamation;

    constructor(
        private historiqueReclamationService: HistoriqueReclamationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historiqueReclamationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'historiqueReclamationListModification',
                content: 'Deleted an historiqueReclamation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-historique-reclamation-delete-popup',
    template: ''
})
export class HistoriqueReclamationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ historiqueReclamation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HistoriqueReclamationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.historiqueReclamation = historiqueReclamation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
