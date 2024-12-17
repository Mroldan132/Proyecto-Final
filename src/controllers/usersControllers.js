import Mesero from "../models/Mesero.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


// Sign in Mesero
export const signInMesero = async (req, res) => {
    const { usuario, contraseña } = req.body;
    try {
        // Buscar mesero por su usuario
        const mesero = await Mesero.findOne({ usuario });
        
        if (!mesero) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Comparar contraseña (ahora que es un único string)
        const passMatch = await bcryptjs.compare(contraseña, mesero.contraseña);
        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Crear token JWT
        const loggedMesero = {
            id: mesero._id,
            nombre: mesero.nombre,
            apellido: mesero.apellido,
            usuario: mesero.usuario,
            dni: mesero.dni
        };

        const token = await createAccessToken(loggedMesero);
        
        return res.status(200).json({
            success: true,
            token,
            loggedMesero,
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        });
    }
};

// Obtener perfil del Mesero autenticado
export const profileMesero = async (req, res) => {
    try {
        console.log(req.user);
        // Asumiendo que `req.user.id` viene del middleware de autenticación JWT
        const mesero = await Mesero.findById(req.user.id).select('-contraseña');
        if (!mesero) {
            return res.status(404).json({
                success: false,
                message: 'Mesero no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            loggedMesero: mesero,
            message: `Hola ${mesero.nombre}, bienvenido/a de nuevo`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        });
    }
};
