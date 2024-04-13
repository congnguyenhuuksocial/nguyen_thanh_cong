"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGetAllProducts = exports.checkGetProducts = exports.checkDeleteProducts = exports.checkUpdateProducts = exports.checkCreateProducts = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("../util/logger"));
const checkCreateProducts = (product) => {
    logger_1.default.info('checkCreateProducts: ', JSON.stringify(product));
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        price: joi_1.default.number().min(1).required(),
        stock: joi_1.default.number().min(1).required(),
        description: joi_1.default.string().min(1).max(300).optional(),
        category: joi_1.default.string().min(1).max(100).optional(),
        image: joi_1.default.string().optional(),
    });
    const { error } = schema.validate(product);
    if (error) {
        throw new mongoose_1.Error(`Validation error: ${error.message}`);
    }
};
exports.checkCreateProducts = checkCreateProducts;
const checkUpdateProducts = (product) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string().required(),
        name: joi_1.default.string().optional(),
        price: joi_1.default.number().min(1).optional(),
        stock: joi_1.default.number().min(1).optional(),
        description: joi_1.default.string().min(1).max(300).optional(),
        category: joi_1.default.string().min(1).max(100).optional(),
        image: joi_1.default.string().optional(),
    });
    const { error } = schema.validate(product);
    if (error) {
        throw new mongoose_1.Error(`Validation error: ${error.message}`);
    }
};
exports.checkUpdateProducts = checkUpdateProducts;
const checkDeleteProducts = (id) => {
    const schema = joi_1.default.string().required();
    const { error } = schema.validate(id);
    if (error) {
        throw new mongoose_1.Error(`Validation error: ${error.message}`);
    }
};
exports.checkDeleteProducts = checkDeleteProducts;
const checkGetProducts = (id) => {
    const schema = joi_1.default.string().required();
    const { error } = schema.validate(id);
    if (error) {
        throw new mongoose_1.Error(`Validation error: ${error.message}`);
    }
};
exports.checkGetProducts = checkGetProducts;
const checkGetAllProducts = (page, limit) => {
    const schema = joi_1.default.object({
        page: joi_1.default.number().min(1).required(),
        limit: joi_1.default.number().min(1).required(),
    });
    const { error } = schema.validate({ page, limit });
    if (error) {
        throw new mongoose_1.Error(`Validation error: ${error.message}`);
    }
};
exports.checkGetAllProducts = checkGetAllProducts;
