import {ApiDelete, ApiGet} from "@/utils/CustomAPI";

const base: string = 'http://localhost:8080/cursos'

export function getListarCursos(params: Object) {
    return ApiGet<any>(`${base}`, { params: params })
}

export function deleteCursoById(id: string) {
    return ApiDelete(`${base}/${id}`)
}
