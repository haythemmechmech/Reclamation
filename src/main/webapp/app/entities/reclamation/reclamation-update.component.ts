import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { INm_Etat } from 'app/shared/model/nm-etat.model';
import { Nm_EtatService } from 'app/entities/nm-etat';
import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';
import { Nm_TypeReclamationService } from 'app/entities/nm-type-reclamation';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action';

@Component({
    selector: 'jhi-reclamation-update',
    templateUrl: './reclamation-update.component.html'
})
export class ReclamationUpdateComponent implements OnInit {
    private _reclamation: IReclamation;
    isSaving: boolean;

    nm_etats: INm_Etat[];

    nm_typereclamations: INm_TypeReclamation[];

    actions: IAction[];
    created_at: string;
    updated_at: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reclamationService: ReclamationService,
        private nm_EtatService: Nm_EtatService,
        private nm_TypeReclamationService: Nm_TypeReclamationService,
        private actionService: ActionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reclamation }) => {
            this.reclamation = reclamation;
        });
        this.nm_EtatService.query().subscribe(
            (res: HttpResponse<INm_Etat[]>) => {
                this.nm_etats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.nm_TypeReclamationService.query().subscribe(
            (res: HttpResponse<INm_TypeReclamation[]>) => {
                this.nm_typereclamations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.actionService.query().subscribe(
            (res: HttpResponse<IAction[]>) => {
                this.actions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.reclamation.created_at = moment(this.created_at, DATE_TIME_FORMAT);
        this.reclamation.updated_at = moment(this.updated_at, DATE_TIME_FORMAT);
        if (this.reclamation.id !== undefined) {
            this.subscribeToSaveResponse(this.reclamationService.update(this.reclamation));
        } else {
            this.subscribeToSaveResponse(this.reclamationService.create(this.reclamation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReclamation>>) {
        result.subscribe((res: HttpResponse<IReclamation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNm_EtatById(index: number, item: INm_Etat) {
        return item.id;
    }

    trackNm_TypeReclamationById(index: number, item: INm_TypeReclamation) {
        return item.id;
    }

    trackActionById(index: number, item: IAction) {
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
    get reclamation() {
        return this._reclamation;
    }

    set reclamation(reclamation: IReclamation) {
        this._reclamation = reclamation;
        this.created_at = moment(reclamation.created_at).format(DATE_TIME_FORMAT);
        this.updated_at = moment(reclamation.updated_at).format(DATE_TIME_FORMAT);
    }
}
