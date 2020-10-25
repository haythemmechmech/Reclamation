import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Nm_Etat } from 'app/shared/model/nm-etat.model';
import { Nm_EtatService } from './nm-etat.service';
import { Nm_EtatComponent } from './nm-etat.component';
import { Nm_EtatDetailComponent } from './nm-etat-detail.component';
import { Nm_EtatUpdateComponent } from './nm-etat-update.component';
import { Nm_EtatDeletePopupComponent } from './nm-etat-delete-dialog.component';
import { INm_Etat } from 'app/shared/model/nm-etat.model';

@Injectable({ providedIn: 'root' })
export class Nm_EtatResolve implements Resolve<INm_Etat> {
    constructor(private service: Nm_EtatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((nm_Etat: HttpResponse<Nm_Etat>) => nm_Etat.body));
        }
        return of(new Nm_Etat());
    }
}

export const nm_EtatRoute: Routes = [
    {
        path: 'nm-etat',
        component: Nm_EtatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Etat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-etat/:id/view',
        component: Nm_EtatDetailComponent,
        resolve: {
            nm_Etat: Nm_EtatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Etat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-etat/new',
        component: Nm_EtatUpdateComponent,
        resolve: {
            nm_Etat: Nm_EtatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Etat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nm-etat/:id/edit',
        component: Nm_EtatUpdateComponent,
        resolve: {
            nm_Etat: Nm_EtatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Etat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nm_EtatPopupRoute: Routes = [
    {
        path: 'nm-etat/:id/delete',
        component: Nm_EtatDeletePopupComponent,
        resolve: {
            nm_Etat: Nm_EtatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reclamationApp.nm_Etat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
