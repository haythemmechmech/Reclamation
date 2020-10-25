import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReclamation } from 'app/shared/model/reclamation.model';

type EntityResponseType = HttpResponse<IReclamation>;
type EntityArrayResponseType = HttpResponse<IReclamation[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {
    private resourceUrl = SERVER_API_URL + 'api/reclamations';

    constructor(private http: HttpClient) {}

    create(reclamation: IReclamation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reclamation);
        return this.http
            .post<IReclamation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reclamation: IReclamation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reclamation);
        return this.http
            .put<IReclamation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReclamation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(reclamation: IReclamation): IReclamation {
        const copy: IReclamation = Object.assign({}, reclamation, {
            created_at: reclamation.created_at != null && reclamation.created_at.isValid() ? reclamation.created_at.toJSON() : null,
            updated_at: reclamation.updated_at != null && reclamation.updated_at.isValid() ? reclamation.updated_at.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.created_at = res.body.created_at != null ? moment(res.body.created_at) : null;
        res.body.updated_at = res.body.updated_at != null ? moment(res.body.updated_at) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((reclamation: IReclamation) => {
            reclamation.created_at = reclamation.created_at != null ? moment(reclamation.created_at) : null;
            reclamation.updated_at = reclamation.updated_at != null ? moment(reclamation.updated_at) : null;
        });
        return res;
    }
}
