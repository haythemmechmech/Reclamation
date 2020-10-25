import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INm_Phase } from 'app/shared/model/nm-phase.model';
import { Nm_PhaseService } from './nm-phase.service';

@Component({
    selector: 'jhi-nm-phase-delete-dialog',
    templateUrl: './nm-phase-delete-dialog.component.html'
})
export class Nm_PhaseDeleteDialogComponent {
    nm_Phase: INm_Phase;

    constructor(private nm_PhaseService: Nm_PhaseService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nm_PhaseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nm_PhaseListModification',
                content: 'Deleted an nm_Phase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nm-phase-delete-popup',
    template: ''
})
export class Nm_PhaseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_Phase }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Nm_PhaseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nm_Phase = nm_Phase;
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
