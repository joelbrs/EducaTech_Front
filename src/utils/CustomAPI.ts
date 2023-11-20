import axios from "axios";

export async function ApiGet<T>(url: string, config?: Object) {
    try {
        const { data, status } = await axios.get<T>(url, config)

        return { data, error: null, status }
    }
    catch (error) {
        return { data: null, error }
    }
}

export async function ApiPost<T>(url: string, params: Object, config?: Object) {
    try {
        const { data } = await axios.post<T>(url, params, config)

        return { data, error: null }
    }
    catch (error) {
        return { data: null, error }
    }
}

export async function ApiPut<T>(url: string, params: Object, config?: Object) {
    try {
        const { data } = await axios.put<T>(url, params, config)

        return { data, error: null }
    }
    catch (error) {
        return { data: null, error }
    }
}

export async function ApiDelete(url: string, config?: Object) {
    try {
        const { data } = await axios.delete(url, config)

        return { error: null }
    }
    catch (error) {
        return { error }
    }
}