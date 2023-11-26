export interface CursoDTOOut {
    id: number
    titulo: string
    cargaHoraria: number
    imagem: string
}

export interface CursoDTOIn {
    titulo: string
    cargaHoraria: number | string
    imagem: string
}

