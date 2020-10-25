import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

type EntityResponseType = HttpResponse<INm_TypeReclamation>;
type EntityArrayResponseType = HttpResponse<INm_TypeReclamation[]>;

@Injectable({ providedIn: 'root' })
export class Nm_TypeReclamationService {
    private resourceUrl = SERVER_API_URL + 'api/nm-type-reclamations';

    constructor(private http: HttpClient) {}

    create(nm_TypeReclamation: INm_TypeReclamation): Observable<EntityResponseType> {
        return this.http.post<INm_TypeReclamation>(this.resourceUrl, nm_TypeReclamation, { observe: 'response' });
    }

    update(nm_TypeReclamation: INm_TypeReclamation): Observable<EntityResponseType> {
        return this.http.put<INm_TypeReclamation>(this.resourceUrl, nm_TypeReclamation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INm_TypeReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INm_TypeReclamation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
