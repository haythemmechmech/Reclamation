import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Nm_Phase } from 'app/shared/model/nm-phase.model';
import { Nm_PhaseService } from './nm-phase.service';
import { Nm_PhaseComponent } from './nm-phase.component';
import { Nm_PhaseDetailComponent } from './nm-phase-detail.component';
import { Nm_PhaseUpdateComponent } from './nm-phase-update.component';
import { Nm_PhaseDeletePopupComponent } from './nm-phase-delete-dialog.component';
import { INm_Phase } from 'app/shared/model/nm-phase.model';

@Injectable({ providedIn: 'root' })
export class Nm_PhaseResolve implements Resolve<INm_Phase> {
    constructor(private service: Nm_PhaseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((nm_Phase: HttpResponse<Nm_Phase>) => nm_Phase.body));
        }
        return of(new Nm_Phase());
    }
}

export const nm_PhaseRoute: Routes = [
    {
        path: 'nm-phase',
        component: Nm_PhaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-phase/:id/view',
        component: Nm_PhaseDetailComponent,
        resolve: {
            nm_Phase: Nm_PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-phase/new',
        component: Nm_PhaseUpdateComponent,
        resolve: {
            nm_Phase: Nm_PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-phase/:id/edit',
        component: Nm_PhaseUpdateComponent,
        resolve: {
            nm_Phase: Nm_PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nm_PhasePopupRoute: Routes = [
    {
        path: 'nm-phase/:id/delete',
        component: Nm_PhaseDeletePopupComponent,
        resolve: {
            nm_Phase: Nm_PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Phase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
