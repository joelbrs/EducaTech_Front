import {ApiDelete, ApiGet, ApiPost, ApiPut} from "@/utils/CustomAPI";
import {CursoDTOIn, CursoDTOOut} from "@/types/curso";

const base: string = 'http://localhost:8080/cursos'

export function getListarCursos(params?: Object) {
    return ApiGet<any>(`${base}`, { params: params })
}

export function getDetalharCurso(id: string) {
    return ApiGet<CursoDTOOut>(`${base}/${id}`)
}

export function postCriarCurso(params: CursoDTOIn) {
    return ApiPost<CursoDTOOut>(`${base}`, params)
}

export function putEditarCurso(id: string, params: CursoDTOIn) {
    return ApiPut<CursoDTOOut>(`${base}/${id}`, params)
}

export function postEmitirCertificado(params: Object) {
  return ApiPost<any>(`${base}/emitir-certificado`, params)
}

export function deleteCursoById(id: string) {
    return ApiDelete(`${base}/${id}`)
}
