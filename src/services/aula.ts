import {ApiDelete, ApiGet, ApiPost, ApiPut} from "@/utils/CustomAPI";
import {CursoDTOIn, CursoDTOOut} from "@/types/curso";
import {AulaDTOIn, AulaDTOOut} from "@/types/aula";

const base: string = 'http://localhost:8080/aulas'

export function getListarAulas(params: Object) {
  return ApiGet<any>(`${base}`, { params: params })
}

export function getDetalharAulaByIdCursoIdModuloAndOrdem(idCurso: string, idModulo: string, ordem: string) {
  return ApiGet<any>(`${base}/${idCurso}/${idModulo}/${ordem}`)
}

export function getListarAulaByIdCursoAndIdModulo(idCurso: string, idModulo: string) {
  return ApiGet<any>(`${base}/${idCurso}/${idModulo}`)
}

export function getProximaOrdem(idCurso: string, idModulo: string) {
  return ApiGet<number>(`${base}/proxima-ordem/${idCurso}/${idModulo}`)
}

export function postCriarAula(params: AulaDTOIn) {
  return ApiPost<AulaDTOOut>(`${base}`, params)
}

export function putFinalizarAula(idAula: string, idUsuario: string) {
  return ApiPut<AulaDTOOut>(`${base}/assistida/${idAula}/${idUsuario}`, {})
}

export function putEditarAula(id: string, params: Object) {
  return ApiPut<AulaDTOOut>(`${base}/${id}`, params)
}

export function deleteAulaById(id: string) {
  return ApiDelete(`${base}/${id}`)
}
