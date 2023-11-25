import {ApiDelete, ApiGet, ApiPost, ApiPut} from "@/utils/CustomAPI";
import {CursoDTOIn, CursoDTOOut} from "@/types/curso";

const base: string = 'http://localhost:8080/cursos'

export function getListarCursos(params: Object) {
    return ApiGet<any>(`${base}`, { params: params })
}

export function postCriarCurso(params: CursoDTOIn) {
    return ApiPost<CursoDTOOut>(`${base}`, params)
}

export function deleteCursoById(id: string) {
    return ApiDelete(`${base}/${id}`)
}
