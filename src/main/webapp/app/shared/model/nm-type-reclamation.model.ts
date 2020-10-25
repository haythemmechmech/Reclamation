export interface INm_TypeReclamation {
    id?: number;
    libelle?: string;
    code?: string;
}

export class Nm_TypeReclamation implements INm_TypeReclamation {
    constructor(public id?: number, public libelle?: string, public code?: string) {}
}
