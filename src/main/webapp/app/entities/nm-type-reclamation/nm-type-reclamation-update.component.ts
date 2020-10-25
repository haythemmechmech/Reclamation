import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';
import { Nm_TypeReclamationService } from './nm-type-reclamation.service';

@Component({
    selector: 'jhi-nm-type-reclamation-update',
    templateUrl: './nm-type-reclamation-update.component.html'
})
export class Nm_TypeReclamationUpdateComponent implements OnInit {
    private _nm_TypeReclamation: INm_TypeReclamation;
    isSaving: boolean;

    constructor(private nm_TypeReclamationService: Nm_TypeReclamationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nm_TypeReclamation }) => {
            this.nm_TypeReclamation = nm_TypeReclamation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nm_TypeReclamation.id !== undefined) {
            this.subscribeToSaveResponse(this.nm_TypeReclamationService.update(this.nm_TypeReclamation));
        } else {
            this.subscribeToSaveResponse(this.nm_TypeReclamationService.create(this.nm_TypeReclamation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INm_TypeReclamation>>) {
        result.subscribe((res: HttpResponse<INm_TypeReclamation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get nm_TypeReclamation() {
        return this._nm_TypeReclamation;
    }

    set nm_TypeReclamation(nm_TypeReclamation: INm_TypeReclamation) {
        this._nm_TypeReclamation = nm_TypeReclamation;
    }
}
