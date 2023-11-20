import type {CursoDTOOut} from "@/curso";
import type {ModuloDTOOut} from "@/modulo";

export interface AulaDTOOut {
    curso: CursoDTOOut
    modulo: ModuloDTOOut
    titulo: string
    descricao: string
    assistida: boolean
    ordem: number
}

export interface AulaDTOIn {
    curso: number
    modulo: number
    titulo: string
    descricao: string
    assistida: boolean
    ordem: number
}