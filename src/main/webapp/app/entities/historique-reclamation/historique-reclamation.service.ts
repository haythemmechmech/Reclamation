import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

type EntityResponseType = HttpResponse<IHistoriqueReclamation>;
type EntityArrayResponseType = HttpResponse<IHistoriqueReclamation[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueReclamationService {
    private resourceUrl = SERVER_API_URL + 'api/historique-reclamations';

    constructor(private http: HttpClient) {}

    create(historiqueReclamation: IHistoriqueReclamation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historiqueReclamation);
        return this.http
            .post<IHistoriqueReclamation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(historiqueReclamation: IHistoriqueReclamation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historiqueReclamation);
        return this.http
            .put<IHistoriqueReclamation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHistoriqueReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHistoriqueReclamation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(historiqueReclamation: IHistoriqueReclamation): IHistoriqueReclamation {
        const copy: IHistoriqueReclamation = Object.assign({}, historiqueReclamation, {
            created_at:
                historiqueReclamation.created_at != null && historiqueReclamation.created_at.isValid()
                    ? historiqueReclamation.created_at.toJSON()
                    : null,
            updated_at:
                historiqueReclamation.updated_at != null && historiqueReclamation.updated_at.isValid()
                    ? historiqueReclamation.updated_at.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.created_at = res.body.created_at != null ? moment(res.body.created_at) : null;
        res.body.updated_at = res.body.updated_at != null ? moment(res.body.updated_at) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((historiqueReclamation: IHistoriqueReclamation) => {
            historiqueReclamation.created_at = historiqueReclamation.created_at != null ? moment(historiqueReclamation.created_at) : null;
            historiqueReclamation.updated_at = historiqueReclamation.updated_at != null ? moment(historiqueReclamation.updated_at) : null;
        });
        return res;
    }
}
