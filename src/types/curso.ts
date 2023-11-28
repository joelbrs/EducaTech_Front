export interface CursoDTOOut {
    id: number
    titulo: string
    cargaHoraria: number
    descricao: string
    imagem: string
    qtdAulas: number
    qtdModulos: number
}

export interface CursoDTOIn {
    titulo: string
    cargaHoraria: number | string
    imagem: string
}

