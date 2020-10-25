import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';
import { Nm_TypeReclamationService } from './nm-type-reclamation.service';

@Component({
    selector: 'jhi-nm-type-reclamation-delete-dialog',
    templateUrl: './nm-type-reclamation-delete-dialog.component.html'
})
export class Nm_TypeReclamationDeleteDialogComponent {
    nm_TypeReclamation: INm_TypeReclamation;

    constructor(
        private nm_TypeReclamationService: Nm_TypeReclamationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nm_TypeReclamationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nm_TypeReclamationListModification',
                content: 'Deleted an nm_TypeReclamation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nm-type-reclamation-delete-popup',
    template: ''
})
export class Nm_TypeReclamationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_TypeReclamation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Nm_TypeReclamationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.nm_TypeReclamation = nm_TypeReclamation;
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
