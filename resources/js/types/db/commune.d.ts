import { Prefecture } from "./Prefecture";

export interface Commune {
    id: number,
    prefecture: Prefecture,
    nom: string,
    code?: string,
    est_actif: boolean
}
