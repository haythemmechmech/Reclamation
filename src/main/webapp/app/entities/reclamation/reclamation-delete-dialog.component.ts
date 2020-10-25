import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';

@Component({
    selector: 'jhi-reclamation-delete-dialog',
    templateUrl: './reclamation-delete-dialog.component.html'
})
export class ReclamationDeleteDialogComponent {
    reclamation: IReclamation;

    constructor(
        private reclamationService: ReclamationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reclamationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reclamationListModification',
                content: 'Deleted an reclamation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reclamation-delete-popup',
    template: ''
})
export class ReclamationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reclamation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReclamationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.reclamation = reclamation;
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
