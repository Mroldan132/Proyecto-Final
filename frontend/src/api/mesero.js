import axios from "../libs/axios"

export const listaMesero = async() =>{
    try {
        const response = await axios.get('/meseros')
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const meseroById = async(id) =>{
    try {
        const response = await axios.get(`/mesero/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const meseroInsert = async(meseroData) =>{
    try {
        const response = await axios.post('/mesero',{
            nombre : meseroData.nombre,
            apellido: meseroData.apellido,
            dni : meseroData.dni
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const meseroUpdate = async(id,meseroData) =>{
    try {
        const response = await axios.put(`/mesero/${id}`,{
            nombre : meseroData.nombre,
            apellido: meseroData.apellido,
            dni : meseroData.dni
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const meseroDelete = async(id) =>{
    try {
        const response = await axios.delete(`/mesero/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        }
    }
}