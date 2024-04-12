"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = require("../middlewares/validations");
const logger_1 = __importDefault(require("../util/logger"));
class ProductController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        /**
         * Get a list of products
         * Access level: Admin, Agent
         * @route GET /products
         * @group Product
         * @security JWT
         * @returns {Array.<Product>} 200
         * @returns {Error.model} 403 - Forbidden error
         * @returns {Error.model} 500 - Internal error
         **/
        this.router.get('/', this.list);
    }
    list(req, res, next) {
        try {
            logger_1.default.info(`GET /products: ${JSON.stringify(req.query)}`);
            const { page, limit } = req.query;
            (0, validations_1.checkGetProducts)(req, res, next);
            res.json({
                message: 'List of products',
                page,
                limit,
            });
        }
        catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`));
        }
    }
}
exports.default = ProductController;
