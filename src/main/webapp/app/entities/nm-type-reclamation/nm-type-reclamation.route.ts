import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Nm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';
import { Nm_TypeReclamationService } from './nm-type-reclamation.service';
import { Nm_TypeReclamationComponent } from './nm-type-reclamation.component';
import { Nm_TypeReclamationDetailComponent } from './nm-type-reclamation-detail.component';
import { Nm_TypeReclamationUpdateComponent } from './nm-type-reclamation-update.component';
import { Nm_TypeReclamationDeletePopupComponent } from './nm-type-reclamation-delete-dialog.component';
import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

@Injectable({ providedIn: 'root' })
export class Nm_TypeReclamationResolve implements Resolve<INm_TypeReclamation> {
    constructor(private service: Nm_TypeReclamationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((nm_TypeReclamation: HttpResponse<Nm_TypeReclamation>) => nm_TypeReclamation.body));
        }
        return of(new Nm_TypeReclamation());
    }
}

export const nm_TypeReclamationRoute: Routes = [
    {
        path: 'nm-type-reclamation',
        component: Nm_TypeReclamationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_TypeReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-type-reclamation/:id/view',
        component: Nm_TypeReclamationDetailComponent,
        resolve: {
            nm_TypeReclamation: Nm_TypeReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_TypeReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-type-reclamation/new',
        component: Nm_TypeReclamationUpdateComponent,
        resolve: {
            nm_TypeReclamation: Nm_TypeReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_TypeReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-type-reclamation/:id/edit',
        component: Nm_TypeReclamationUpdateComponent,
        resolve: {
            nm_TypeReclamation: Nm_TypeReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_TypeReclamation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nm_TypeReclamationPopupRoute: Routes = [
    {
        path: 'nm-type-reclamation/:id/delete',
        component: Nm_TypeReclamationDeletePopupComponent,
        resolve: {
            nm_TypeReclamation: Nm_TypeReclamationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_TypeReclamation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
