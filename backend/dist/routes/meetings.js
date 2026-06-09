"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Meeting_1 = __importDefault(require("../models/Meeting"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const schema = joi_1.default.object({
    groupId: joi_1.default.number().integer().required(),
    start: joi_1.default.date().required(),
    end: joi_1.default.date().required(),
    description: joi_1.default.string().required(),
    room: joi_1.default.string().required()
});
// GET /api/meetings/group/:groupId
router.get('/group/:groupId', async (req, res, next) => {
    try {
        const groupId = Number(req.params.groupId);
        const meetings = await Meeting_1.default.findAll({ where: { groupId } });
        res.json(meetings);
    }
    catch (err) {
        next(err);
    }
});
// GET /api/meetings/:id
router.get('/:id', async (req, res, next) => {
    try {
        const m = await Meeting_1.default.findByPk(req.params.id);
        if (!m)
            return res.status(404).send({ message: 'Not found' });
        res.json(m);
    }
    catch (err) {
        next(err);
    }
});
// POST /api/meetings
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        if (new Date(value.start) < new Date())
            return res.status(400).send({ message: 'Start in past' });
        if (new Date(value.start) >= new Date(value.end))
            return res.status(400).send({ message: 'Start must be before end' });
        const m = await Meeting_1.default.create(value);
        res.status(201).json(m);
    }
    catch (err) {
        next(err);
    }
});
// PUT /api/meetings/:id
router.put('/:id', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        if (new Date(value.start) >= new Date(value.end))
            return res.status(400).send({ message: 'Start must be before end' });
        const m = await Meeting_1.default.findByPk(req.params.id);
        if (!m)
            return res.status(404).send({ message: 'Not found' });
        await m.update(value);
        res.json(m);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /api/meetings/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const m = await Meeting_1.default.findByPk(req.params.id);
        if (!m)
            return res.status(404).send({ message: 'Not found' });
        await m.destroy();
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
