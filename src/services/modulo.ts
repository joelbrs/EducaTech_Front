import {ApiDelete, ApiGet, ApiPost} from "@/utils/CustomAPI";
import {ModuloDTOIn, ModuloDTOOut} from "@/types/modulo";

const base: string = 'http://localhost:8080/modulos'

export function getListarModulos(params: Object) {
    return ApiGet<any>(`${base}`, { params: params })
}

export function getListarModulosComAulas(idCurso: string, idUsuario: string) {
  return ApiGet<any>(`${base}/aulas/${idCurso}/${idUsuario}`)
}

export function getListarModulosByIdCurso(idCurso: string) {
    return ApiGet<any>(`${base}/curso/${idCurso}`)
}

export function getDetalharModulo(id: string) {
    return ApiGet<ModuloDTOOut>(`${base}/${id}`)
}

export function getProximaOrdem(idCurso: string) {
    return ApiGet<number>(`${base}/proxima-ordem/${idCurso}`)
}

export function postCriarModulo(params: ModuloDTOIn) {
    return ApiPost<ModuloDTOOut>(`${base}`, params)
}

export function deleteModuloById(id: string) {
    return ApiDelete(`${base}/${id}`)
}
