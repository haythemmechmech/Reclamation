import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INm_Etat } from 'app/shared/model/nm-etat.model';

type EntityResponseType = HttpResponse<INm_Etat>;
type EntityArrayResponseType = HttpResponse<INm_Etat[]>;

@Injectable({ providedIn: 'root' })
export class Nm_EtatService {
    private resourceUrl = SERVER_API_URL + 'api/nm-etats';

    constructor(private http: HttpClient) {}

    create(nm_Etat: INm_Etat): Observable<EntityResponseType> {
        return this.http.post<INm_Etat>(this.resourceUrl, nm_Etat, { observe: 'response' });
    }

    update(nm_Etat: INm_Etat): Observable<EntityResponseType> {
        return this.http.put<INm_Etat>(this.resourceUrl, nm_Etat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INm_Etat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INm_Etat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
