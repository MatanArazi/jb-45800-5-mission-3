import { Router } from 'express'
import Group from '../models/Group'

const router = Router()

// GET /api/groups - list groups
router.get('/', async (req, res, next) => {
    try {
        const groups = await Group.findAll()
        res.json(groups)
    } catch (err) { next(err) }
})

export default router
