import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INm_Phase } from 'app/shared/model/nm-phase.model';
import { Nm_PhaseService } from './nm-phase.service';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action';

@Component({
    selector: 'jhi-nm-phase-update',
    templateUrl: './nm-phase-update.component.html'
})
export class Nm_PhaseUpdateComponent implements OnInit {
    private _nm_Phase: INm_Phase;
    isSaving: boolean;

    actions: IAction[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private nm_PhaseService: Nm_PhaseService,
        private actionService: ActionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nm_Phase }) => {
            this.nm_Phase = nm_Phase;
        });
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
        if (this.nm_Phase.id !== undefined) {
            this.subscribeToSaveResponse(this.nm_PhaseService.update(this.nm_Phase));
        } else {
            this.subscribeToSaveResponse(this.nm_PhaseService.create(this.nm_Phase));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INm_Phase>>) {
        result.subscribe((res: HttpResponse<INm_Phase>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get nm_Phase() {
        return this._nm_Phase;
    }

    set nm_Phase(nm_Phase: INm_Phase) {
        this._nm_Phase = nm_Phase;
    }
}
