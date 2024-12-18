import Mesero from '../models/Mesero.js';
import bcryptjs from 'bcryptjs';

// Get all clients
export const getMeseros = async (req, res) => {
    try {
        const meseros = await Mesero.find();
        res.json(meseros);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get client by ID
export const getMesero = async (req, res) => {
    try {
        const mesero = await Mesero.findById(req.params.id);
        res.json(mesero);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Add a new client
export const addMesero = async (req, res) => {
    const { nombre, apellido, usuario, contraseña, dni } = req.body;
    try {
        // Verifica si el Mesero ya existe por DNI (o por el campo que quieras que sea único)
        let existente = await Mesero.findOne({ dni });
        if (existente) {
            return res.status(400).json({ 
                success: false, 
                message: 'El mesero ya existe' 
            });
        }

        // Hashear la contraseña
        const passwordHash = await bcryptjs.hash(contraseña, 10);
        
        // Crear nuevo Mesero
        const newMesero = new Mesero({
            nombre,
            apellido,
            usuario,
            contraseña: passwordHash,
            dni
        });

        await newMesero.save();

        return res.status(201).json({
            success: true,
            message: 'Mesero registrado con éxito'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        });
    }
};

// Update an existing mesero
export const updateMesero = async (req, res) => {
    const { nombre, apellido, dni, telefono } = req.body;
    const nuevoMesero = {};
    if (nombre) nuevoMesero.nombre = nombre;
    if (apellido) nuevoMesero.apellido = apellido;
    if (dni) nuevoMesero.dni = dni;
    if (telefono) nuevoMesero.telefono = telefono;
    try {
        let mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ msg: 'Mesero no encontrado' });
        }
        mesero = await Mesero.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoMesero }, { new: true });
        res.json(mesero);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a client
export const delMesero = async (req, res) => {
    try {
        let mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ msg: 'Mesero no encontrado' });
        }
        await Mesero.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'Mesero eliminado' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
