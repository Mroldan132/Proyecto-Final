import { Router } from 'express'
const router = Router()

import meseroRoutes from './mesero.routes.js'
import clienteRoutes from './cliente.routes.js'
import ordenRoutes from './orden.routes.js'
import platoRoutes from './plato.routes.js'
import categoriaRoutes from './categoria.routes.js'

router.use(meseroRoutes)
router.use(clienteRoutes)
router.use(ordenRoutes)
router.use(platoRoutes)
router.use(categoriaRoutes)

export default router