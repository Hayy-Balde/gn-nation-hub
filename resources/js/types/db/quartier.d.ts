import { Commune } from "./commune";

export interface Quartier {
    id: number,
    commune: Commune,
    nom: string,
    code?: string,
    est_actif: boolean
}
