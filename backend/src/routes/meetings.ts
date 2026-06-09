import { Router } from 'express'
import Meeting from '../models/Meeting'
import Joi from 'joi'

const router = Router()

const schema = Joi.object({
    groupId: Joi.number().integer().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    description: Joi.string().required(),
    room: Joi.string().required()
})

// GET /api/meetings/group/:groupId
router.get('/group/:groupId', async (req, res, next) => {
    try {
        const groupId = Number(req.params.groupId)
        const meetings = await Meeting.findAll({ where: { groupId } })
        res.json(meetings)
    } catch (err) { next(err) }
})

// GET /api/meetings/:id
router.get('/:id', async (req, res, next) => {
    try {
        const m = await Meeting.findByPk(req.params.id)
        if (!m) return res.status(404).send({ message: 'Not found' })
        res.json(m)
    } catch (err) { next(err) }
})

// POST /api/meetings
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body)
        if (new Date(value.start) < new Date()) return res.status(400).send({ message: 'Start in past' })
        if (new Date(value.start) >= new Date(value.end)) return res.status(400).send({ message: 'Start must be before end' })
        const m = await Meeting.create(value)
        res.status(201).json(m)
    } catch (err) { next(err) }
})

// PUT /api/meetings/:id
router.put('/:id', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body)
        if (new Date(value.start) >= new Date(value.end)) return res.status(400).send({ message: 'Start must be before end' })
        const m = await Meeting.findByPk(req.params.id)
        if (!m) return res.status(404).send({ message: 'Not found' })
        await m.update(value)
        res.json(m)
    } catch (err) { next(err) }
})

// DELETE /api/meetings/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const m = await Meeting.findByPk(req.params.id)
        if (!m) return res.status(404).send({ message: 'Not found' })
        await m.destroy()
        res.status(204).send()
    } catch (err) { next(err) }
})

export default router
