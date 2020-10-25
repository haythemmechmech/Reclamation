import { IReclamation } from 'app/shared/model//reclamation.model';

export interface INm_Etat {
    id?: number;
    libelle?: string;
    code?: string;
    reclamations?: IReclamation[];
}

export class Nm_Etat implements INm_Etat {
    constructor(public id?: number, public libelle?: string, public code?: string, public reclamations?: IReclamation[]) {}
}
