"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Group_1 = __importDefault(require("../models/Group"));
const router = (0, express_1.Router)();
// GET /api/groups - list groups
router.get('/', async (req, res, next) => {
    try {
        const groups = await Group_1.default.findAll();
        res.json(groups);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
