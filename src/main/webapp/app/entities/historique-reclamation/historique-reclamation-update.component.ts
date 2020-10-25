import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';
import { HistoriqueReclamationService } from './historique-reclamation.service';

@Component({
    selector: 'jhi-historique-reclamation-update',
    templateUrl: './historique-reclamation-update.component.html'
})
export class HistoriqueReclamationUpdateComponent implements OnInit {
    private _historiqueReclamation: IHistoriqueReclamation;
    isSaving: boolean;
    created_at: string;
    updated_at: string;

    constructor(private historiqueReclamationService: HistoriqueReclamationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ historiqueReclamation }) => {
            this.historiqueReclamation = historiqueReclamation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.historiqueReclamation.created_at = moment(this.created_at, DATE_TIME_FORMAT);
        this.historiqueReclamation.updated_at = moment(this.updated_at, DATE_TIME_FORMAT);
        if (this.historiqueReclamation.id !== undefined) {
            this.subscribeToSaveResponse(this.historiqueReclamationService.update(this.historiqueReclamation));
        } else {
            this.subscribeToSaveResponse(this.historiqueReclamationService.create(this.historiqueReclamation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueReclamation>>) {
        result.subscribe(
            (res: HttpResponse<IHistoriqueReclamation>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get historiqueReclamation() {
        return this._historiqueReclamation;
    }

    set historiqueReclamation(historiqueReclamation: IHistoriqueReclamation) {
        this._historiqueReclamation = historiqueReclamation;
        this.created_at = moment(historiqueReclamation.created_at).format(DATE_TIME_FORMAT);
        this.updated_at = moment(historiqueReclamation.updated_at).format(DATE_TIME_FORMAT);
    }
}
