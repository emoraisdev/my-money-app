import { Router } from 'express'

import {
  getAll,
  getSummary,
  create,
  update,
  remove
} from './billingCycleController.js'

const router = Router()

router.get('/', getAll)
router.get('/summary', getSummary)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router