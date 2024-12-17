import axios from "../libs/axios";

export const registerRequest = async (userData) => {
    return await axios.post("/mesero", {

    nombre: userData.nombre,
    apellido: userData.apellido,
    usuario: userData.usuario,
    contraseña: userData.contraseña,
    dni: userData.dni
    
    })
    .then((response) => {
        return response;    
    }
    ).catch((error) => {
        return error;
    });
}

export const loginRequest = async(logedUser) => {

    return await axios.post("/mesero/signin", {
        usuario: logedUser.usuario,
        contraseña: logedUser.contraseña
        })
        .then((response) => {
            return response;
        }
    )
    .catch((error) => {
        return error;
    });
};

export const profileRequest = async() => {
    
    return await axios.get("/mesero/profile")
        .then((response) => {
            return response;
        }
    )
    .catch((error) => {
        return error;
    });
}