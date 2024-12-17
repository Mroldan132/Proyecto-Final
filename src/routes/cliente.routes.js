import { Router } from 'express'

const router = Router()

import { getCliente, getClientes, addCliente, updateCliente, delCliente } from '../controllers/clienteController.js'

router.get('/clientes', getClientes)
router.get('/cliente/:id', getCliente)
router.post('/cliente', addCliente)
router.put('/cliente/:id', updateCliente)
router.delete('/cliente/:id', delCliente)

export default router