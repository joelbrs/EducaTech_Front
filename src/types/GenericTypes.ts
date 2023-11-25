import {file, File} from "@babel/types";

export class ImageDTO {
    private _nome: string
    private _file: File | null
    private _imagem: string

    constructor(nome: string, file: File, imagem: string) {
        this._nome = nome
        this._file = file
        this._imagem = imagem
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get file(): File | null {
        return this._file;
    }

    set file(value: File | null) {
        this._file = value;
    }

    get imagem(): string {
        return this._imagem;
    }

    set imagem(value: string) {
        this._imagem = value;
    }
}
