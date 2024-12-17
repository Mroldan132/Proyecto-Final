import { Router } from 'express'

const router = Router()

import { getOrdenes, getOrden, addOrden, updateOrden, delOrden } from '../controllers/ordenController.js'

router.get('/ordenes', getOrdenes)
router.get('/orden/:id', getOrden)
router.post('/orden', addOrden)
router.put('/orden/:id', updateOrden)
router.delete('/orden/:id', delOrden)

export default router