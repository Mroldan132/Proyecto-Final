import { Router } from 'express'

const router = Router()

import { getPlatos, getPlato, addPlato, updatePlato, delPlato } from '../controllers/platoController.js'

router.get('/platos', getPlatos)
router.get('/plato/:id', getPlato)
router.post('/plato', addPlato)
router.put('/plato/:id', updatePlato)
router.delete('/plato/:id', delPlato)

export default router