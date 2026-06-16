import { Quartier } from "./quartier";

export interface Secteur {
    id: number,
    quartier: Quartier,
    nom: string,
    code?: string,
    est_actif: boolean
}
