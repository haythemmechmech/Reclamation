import { Moment } from 'moment';

export interface IHistoriqueReclamation {
    id?: number;
    description?: string;
    titre?: string;
    created_at?: Moment;
    created_by?: string;
    affected_to?: string;
    reclamation_id?: number;
    updated_at?: Moment;
    phase_libelle?: string;
    etat_libelle?: string;
    type_libelle?: string;
}

export class HistoriqueReclamation implements IHistoriqueReclamation {
    constructor(
        public id?: number,
        public description?: string,
        public titre?: string,
        public created_at?: Moment,
        public created_by?: string,
        public affected_to?: string,
        public reclamation_id?: number,
        public updated_at?: Moment,
        public phase_libelle?: string,
        public etat_libelle?: string,
        public type_libelle?: string
    ) {}
}
