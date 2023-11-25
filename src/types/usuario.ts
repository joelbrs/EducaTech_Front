export interface UsuarioDTOOut {
    id?: number
    cpf?: string
    nome?: string
    email?: string
    tipoUsuario?: string
}

export interface UsuarioDTOIn {
    cpf: string
    nome: string
    email: string
    senhaAtual: string
    senhaNova: string
}
