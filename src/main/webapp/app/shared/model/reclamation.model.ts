import { Moment } from 'moment';
import { INm_Etat } from 'app/shared/model//nm-etat.model';
import { INm_TypeReclamation } from 'app/shared/model//nm-type-reclamation.model';
import { IAction } from 'app/shared/model//action.model';

export interface IReclamation {
    id?: number;
    description?: string;
    titre?: string;
    created_at?: Moment;
    created_by?: string;
    updated_at?: Moment;
    affected_to?: string;
    nm_Etats?: INm_Etat[];
    nm_TypeReclamation?: INm_TypeReclamation;
    phases?: IAction[];
}

export class Reclamation implements IReclamation {
    constructor(
        public id?: number,
        public description?: string,
        public titre?: string,
        public created_at?: Moment,
        public created_by?: string,
        public updated_at?: Moment,
        public affected_to?: string,
        public nm_Etats?: INm_Etat[],
        public nm_TypeReclamation?: INm_TypeReclamation,
        public phases?: IAction[]
    ) {}
}
