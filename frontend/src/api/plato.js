import axios from "../libs/axios"

export const listaPlato = async() =>{
    try {
        const response = await axios.get('/plato')
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const platoById = async(id) =>{
    try {
        const response = await axios.get(`/plato/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const platoInsert = async(platoData) =>{
    try {
        const response = await axios.post('/plato',{
            nombre : platoData.nombre,
            descripcion : platoData.descripcion,
            precio : platoData.precio,
            categoria : platoData.categoria,
            imagenes : platoData.imagenes
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const platoUpdate = async(id,platoData) =>{
    try {
        const response = await axios.put(`/plato/${id}`,{
            nombre : platoData.nombre,
            descripcion : platoData.descripcion,
            precio : platoData.precio,
            categoria : platoData.categoria,
            imagenes : platoData.imagenes
        })
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
}

export const platoDelete = async(id) =>{
    try {
        const response = await axios.delete(`/plato/${id}`)
        return response.data
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        }
    }
}