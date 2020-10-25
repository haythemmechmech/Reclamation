import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { ReclamationComponent } from './reclamation.component';
import { ReclamationDetailComponent } from './reclamation-detail.component';
import { ReclamationUpdateComponent } from './reclamation-update.component';
import { ReclamationDeletePopupComponent } from './reclamation-delete-dialog.component';
import { IReclamation } from 'app/shared/model/reclamation.model';

@Injectable({ providedIn: 'root' })
export class ReclamationResolve implements Resolve<IReclamation> {
    constructor(private service: ReclamationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((reclamation: HttpResponse<Reclamation>) => reclamation.body));
        }
        return of(new Reclamation());
    }
}

export const reclamationRoute: Routes = [
    {
        path: 'reclamation',
        component: ReclamationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.reclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reclamation/:id/view',
        component: ReclamationDetailComponent,
        resolve: {
            reclamation: ReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.reclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reclamation/new',
        component: ReclamationUpdateComponent,
        resolve: {
            reclamation: ReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.reclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reclamation/:id/edit',
        component: ReclamationUpdateComponent,
        resolve: {
            reclamation: ReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.reclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reclamationPopupRoute: Routes = [
    {
        path: 'reclamation/:id/delete',
        component: ReclamationDeletePopupComponent,
        resolve: {
            reclamation: ReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.reclamation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
