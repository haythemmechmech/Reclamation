import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INm_Etat } from 'app/shared/model/nm-etat.model';
import { Nm_EtatService } from './nm-etat.service';

@Component({
    selector: 'jhi-nm-etat-delete-dialog',
    templateUrl: './nm-etat-delete-dialog.component.html'
})
export class Nm_EtatDeleteDialogComponent {
    nm_Etat: INm_Etat;

    constructor(private nm_EtatService: Nm_EtatService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nm_EtatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nm_EtatListModification',
                content: 'Deleted an nm_Etat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nm-etat-delete-popup',
    template: ''
})
export class Nm_EtatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nm_Etat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Nm_EtatDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nm_Etat = nm_Etat;
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
