import axios from "../libs/axios";

export const listaCategoria = async () => {
    try {
        const response = await axios.get('/categorias');
        return response.data;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
};

export const categoriaById = async (id) => {
    try {
        const response = await axios.get(`/categoria/${id}`);
        return response.data;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
};

export const categoriaInsert = async (categoriaData) => {
    try {
        const response = await axios.post('/categoria', {
            nombre: categoriaData.nombre,
            descripcion: categoriaData.descripcion
        });
        return response.data;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
};

export const categoriaUpdate = async (id, categoriaData) => {
    try {
        const response = await axios.put(`/categoria/${id}`, {
            nombre: categoriaData.nombre,
            descripcion: categoriaData.descripcion
        });
        return response.data;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
};

export const categoriaDelete = async (id) => {
    try {
        const response = await axios.delete(`/categoria/${id}`);
        return response.data;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            message: error.message
        };
    }
};
