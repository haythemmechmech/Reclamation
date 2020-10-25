import { IAction } from 'app/shared/model//action.model';

export interface INm_Phase {
    id?: number;
    libelle?: string;
    code?: string;
    actions?: IAction[];
}

export class Nm_Phase implements INm_Phase {
    constructor(public id?: number, public libelle?: string, public code?: string, public actions?: IAction[]) {}
}
