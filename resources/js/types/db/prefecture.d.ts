import { Region } from "./region";

export interface Prefecture {
    id: number,
    region: Region,
    nom: string,
    code?: string,
    est_actif: boolean
}
