import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAction } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { INm_Phase } from 'app/shared/model/nm-phase.model';
import { Nm_PhaseService } from 'app/entities/nm-phase';
import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from 'app/entities/reclamation';

@Component({
    selector: 'jhi-action-update',
    templateUrl: './action-update.component.html'
})
export class ActionUpdateComponent implements OnInit {
    private _action: IAction;
    isSaving: boolean;

    nm_phases: INm_Phase[];

    reclamations: IReclamation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private actionService: ActionService,
        private nm_PhaseService: Nm_PhaseService,
        private reclamationService: ReclamationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
        });
        this.nm_PhaseService.query().subscribe(
            (res: HttpResponse<INm_Phase[]>) => {
                this.nm_phases = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(this.actionService.update(this.action));
        } else {
            this.subscribeToSaveResponse(this.actionService.create(this.action));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
        result.subscribe((res: HttpResponse<IAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNm_PhaseById(index: number, item: INm_Phase) {
        return item.id;
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
    get action() {
        return this._action;
    }

    set action(action: IAction) {
        this._action = action;
    }
}
