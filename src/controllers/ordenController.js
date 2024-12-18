import Orden from '../models/Orden.js';
// Get all Orders
export const getOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.json(ordenes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get Order by ID
export const getOrden = async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// Add a new Order
export const addOrden = async (req, res) => {
    const { mesa, nroDeOrden, platillos, cantidades, estado } = req.body;
    try {
        let orden = new Orden({ mesa, nroDeOrden, platillos, cantidades, estado });
        orden = await orden.save();
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


// Update an existing Order
export const updateOrden = async (req, res) => {
    const { mesa, nroDeOrden, platillos, cantidades, estado } = req.body;
    const nuevaOrden = {};
    if (mesa) nuevaOrden.mesa = mesa;
    if (nroDeOrden) nuevaOrden.nroDeOrden = nroDeOrden;
    if (platillos) nuevaOrden.platillos = platillos;
    if (cantidades) nuevaOrden.cantidades = cantidades;
    if (estado) nuevaOrden.estado = estado;
    try {
        let orden = await Orden.findById(req.params.id);
        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }
        orden = await Orden.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaOrden }, { new: true });
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a client
export const delOrden = async (req, res) => {
    try {
        let orden = await Orden.findById(req.params.id);
        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }
        await Orden.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'Orden eliminada' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
};

