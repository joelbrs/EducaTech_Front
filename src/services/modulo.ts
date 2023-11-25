import {ApiDelete, ApiGet, ApiPost, ApiPut} from "@/utils/CustomAPI";
import {CursoDTOIn, CursoDTOOut} from "@/types/curso";

const base: string = 'http://localhost:8080/modulos'

export function getListarModulos(params: Object) {
    return ApiGet<any>(`${base}`, { params: params })
}

export function getDetalharModulo(id: string) {
    return ApiGet<CursoDTOOut>(`${base}/${id}`)
}

export function postCriarModulo(params: CursoDTOIn) {
    return ApiPost<CursoDTOOut>(`${base}`, params)
}

export function deleteModuloById(id: string) {
    return ApiDelete(`${base}/${id}`)
}
