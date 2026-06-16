import { Pays } from "./pays";

export interface Region {
    id: number,
    pays: Pays,
    nom: string,
    code?: string,
    est_actif: boolean
}
