import axios from "../libs/axios"

export const listaOrden = async() =>{
    try {
        const response = await axios.get('/orden')
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const ordenById = async(id) =>{
    try {
        const response = await axios.get(`/orden/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const ordenInsert = async(ordenData) =>{
    try {
        const response = await axios.post('/orden',{
            mesa : ordenData.mesa,
            nroDeOrden : ordenData.nroDeOrden,
            platillos : ordenData.platillos,
            cantidades : ordenData.cantidades,
            estado : ordenData.estado
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const ordenUpdate = async(id,ordenData) =>{
    try {
        const response = await axios.put(`/orden/${id}`,{
            mesa : ordenData.mesa,
            nroDeOrden : ordenData.nroDeOrden,
            platillos : ordenData.platillos,
            cantidades : ordenData.cantidades,
            estado : ordenData.estado
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const ordenDelete = async(id) =>{
    try {
        const response = await axios.delete(`/orden/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        }
    }
}