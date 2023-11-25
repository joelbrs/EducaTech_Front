import {ApiGet, ApiPost, ApiPut} from "@/utils/CustomAPI";
import {UsuarioDTOIn, UsuarioDTOOut} from "@/types/usuario";

const base: string = 'http://localhost:8080/usuarios'

export function getAlunoById(id: string) {
  return ApiGet<UsuarioDTOOut>(`${base}/${id}`)
}

export function getLogin(params: Object) {
  return ApiGet<UsuarioDTOOut>(`${base}/login`, {
    params: params
  })
}

export function postCriarAluno(params: UsuarioDTOIn) {
  return ApiPost<any>(`${base}`, params)
}

export function putAtualizarAluno(id: string, params: UsuarioDTOIn) {
  return ApiPut<UsuarioDTOOut>(`${base}/${id}`, params)
}


