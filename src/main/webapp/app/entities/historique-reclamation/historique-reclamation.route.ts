import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';
import { HistoriqueReclamationService } from './historique-reclamation.service';
import { HistoriqueReclamationComponent } from './historique-reclamation.component';
import { HistoriqueReclamationDetailComponent } from './historique-reclamation-detail.component';
import { HistoriqueReclamationUpdateComponent } from './historique-reclamation-update.component';
import { HistoriqueReclamationDeletePopupComponent } from './historique-reclamation-delete-dialog.component';
import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

@Injectable({ providedIn: 'root' })
export class HistoriqueReclamationResolve implements Resolve<IHistoriqueReclamation> {
    constructor(private service: HistoriqueReclamationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((historiqueReclamation: HttpResponse<HistoriqueReclamation>) => historiqueReclamation.body));
        }
        return of(new HistoriqueReclamation());
    }
}

export const historiqueReclamationRoute: Routes = [
    {
        path: 'historique-reclamation',
        component: HistoriqueReclamationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.historiqueReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historique-reclamation/:id/view',
        component: HistoriqueReclamationDetailComponent,
        resolve: {
            historiqueReclamation: HistoriqueReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.historiqueReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historique-reclamation/new',
        component: HistoriqueReclamationUpdateComponent,
        resolve: {
            historiqueReclamation: HistoriqueReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.historiqueReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historique-reclamation/:id/edit',
        component: HistoriqueReclamationUpdateComponent,
        resolve: {
            historiqueReclamation: HistoriqueReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.historiqueReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historiqueReclamationPopupRoute: Routes = [
    {
        path: 'historique-reclamation/:id/delete',
        component: HistoriqueReclamationDeletePopupComponent,
        resolve: {
            historiqueReclamation: HistoriqueReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.historiqueReclamation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
