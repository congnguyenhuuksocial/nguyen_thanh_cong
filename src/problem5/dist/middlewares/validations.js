"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGetProducts = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const checkGetProducts = (req, res, next) => {
    const schema = joi_1.default.object({
        page: joi_1.default.number().min(1).required(),
        limit: joi_1.default.number().min(1).required(),
    });
    const { error } = schema.validate(req.query);
    if (error) {
        next(new mongoose_1.Error(error.message));
    }
    else {
        next();
    }
};
exports.checkGetProducts = checkGetProducts;
