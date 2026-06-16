import { Devise } from "./devise";

export interface Pays {
    id: number,
    nom: string,
    code_iso?: string,
    indicatif_tel: string,
    devise: Devise,
    est_actif: boolean
}
