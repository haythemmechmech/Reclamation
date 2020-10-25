import { INm_Phase } from 'app/shared/model//nm-phase.model';
import { IReclamation } from 'app/shared/model//reclamation.model';

export interface IAction {
    id?: number;
    phase_precedente?: string;
    ordre?: string;
    description?: string;
    phase_actuelle?: string;
    nm_PhaseSuivants?: INm_Phase[];
    phases?: IReclamation[];
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public phase_precedente?: string,
        public ordre?: string,
        public description?: string,
        public phase_actuelle?: string,
        public nm_PhaseSuivants?: INm_Phase[],
        public phases?: IReclamation[]
    ) {}
}
