import axios from "../libs/axios"

export const listaCliente = async() =>{
    try {
        const response = await axios.get('/clientes')
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const clienteById = async(id) =>{
    try {
        const response = await axios.get(`/cliente/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const clienteInsert = async(clienteData) =>{
    try {
        const response = await axios.post('/cliente',{
            nombre : clienteData.nombre,
            dni : clienteData.dni,
            email : clienteData.email,
            telefono : clienteData.telefono
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const clienteUpdate = async(id,clienteData) =>{
    try {
        const response = await axios.put(`/cliente/${id}`,{
            nombre : clienteData.nombre,
            dni : clienteData.dni,
            email : clienteData.email,
            telefono : clienteData.telefono
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const clienteDelete = async(id) =>{
    try {
        const response = await axios.delete(`/cliente/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        }
    }
}