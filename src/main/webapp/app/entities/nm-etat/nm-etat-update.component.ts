import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INm_Etat } from 'app/shared/model/nm-etat.model';
import { Nm_EtatService } from './nm-etat.service';
import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from 'app/entities/reclamation';

@Component({
    selector: 'jhi-nm-etat-update',
    templateUrl: './nm-etat-update.component.html'
})
export class Nm_EtatUpdateComponent implements OnInit {
    private _nm_Etat: INm_Etat;
    isSaving: boolean;

    reclamations: IReclamation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private nm_EtatService: Nm_EtatService,
        private reclamationService: ReclamationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nm_Etat }) => {
            this.nm_Etat = nm_Etat;
        });
        this.reclamationService.query().subscribe(
            (res: HttpResponse<IReclamation[]>) => {
                this.reclamations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nm_Etat.id !== undefined) {
            this.subscribeToSaveResponse(this.nm_EtatService.update(this.nm_Etat));
        } else {
            this.subscribeToSaveResponse(this.nm_EtatService.create(this.nm_Etat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INm_Etat>>) {
        result.subscribe((res: HttpResponse<INm_Etat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackReclamationById(index: number, item: IReclamation) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get nm_Etat() {
        return this._nm_Etat;
    }

    set nm_Etat(nm_Etat: INm_Etat) {
        this._nm_Etat = nm_Etat;
    }
}
