import type {CursoDTOOut} from "@/types/curso";

export interface ModuloDTOOut {
    id: number
    titulo: string
    descricao: string
    ordem: number
    curso: CursoDTOOut
}

export interface ModuloDTOIn {
    titulo: string
    descricao: string
    ordem: number | string
    curso: number | string
    material: {
        arquivo: string,
        nome: string
    }
}
