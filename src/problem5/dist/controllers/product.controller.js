"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../util/logger"));
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`POST /products: ${JSON.stringify(req.body)}`);
                const product = yield product_service_1.default.create(req.body);
                res.json({
                    message: 'Product created',
                    data: product,
                });
            }
            catch (e) {
                // @ts-ignore
                next(new Error(`Internal error: ${e.message}`));
            }
        });
        this.list = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET /products: ${JSON.stringify(req.query)}`);
                const { page, limit } = req.query;
                // validation
                // checkGetProducts(req, res, next)
                const products = yield product_service_1.default.list(Number(page), Number(limit));
                res.json({
                    message: 'Product list',
                    data: products,
                });
            }
            catch (e) {
                // @ts-ignore
                next(new Error(`Internal error: ${e.message}`));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`PUT /products/${req.params.id}: ${JSON.stringify(req.body)}`);
                const product = yield product_service_1.default.update(req.params.id, req.body);
                res.json({
                    message: 'Product updated',
                    data: product,
                });
            }
            catch (e) {
                // @ts-ignore
                next(new Error(`Internal error: ${e.message}`));
            }
        });
        this.remove = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`DELETE /products/${req.params.id}`);
                const product = yield product_service_1.default.remove(req.params.id);
                res.json({
                    message: 'Product removed',
                    data: product,
                });
            }
            catch (e) {
                // @ts-ignore
                next(new Error(`Internal error: ${e.message}`));
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET /products/${req.params.id}`);
                const product = yield product_service_1.default.findById(req.params.id);
                res.json({
                    data: product,
                });
            }
            catch (e) {
                // @ts-ignore
                next(new Error(`Internal error: ${e.message}`));
            }
        });
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
        /**
         * Create a new product
         * Access level: Admin
         * @route POST /products
         * @group Product
         * @security JWT
         * @param {Product.model} product.body.required - Product data
         * @returns {Product.model} 200
         * @returns {Error.model} 403 - Forbidden error
         * @returns {Error.model} 500 - Internal error
         * @returns {Error.model} 400 - Bad request
         */
        this.router.post('/', this.create);
        /**
         * Update a product
         * Access level: Admin
         * @route PUT /products/{id}
         * @group Product
         * @security JWT
         * @param {string} id.path.required - Product ID
         * @param {Product.model} product.body.required - Product data
         * @returns {Product.model} 200
         * @returns {Error.model} 403 - Forbidden error
         * @returns {Error.model} 500 - Internal error
         * @returns {Error.model} 400 - Bad request
         * @returns {Error.model} 404 - Not found
         */
        this.router.put('/:id', this.update);
        /**
         * Remove a product
         * Access level: Admin
         * @route DELETE /products/{id}
         * @group Product
         * @security JWT
         * @param {string} id.path.required - Product ID
         * @returns {Product.model} 200
         * @returns {Error.model} 403 - Forbidden error
         * @returns {Error.model} 500 - Internal error
         * @returns {Error.model} 404 - Not found
         * @returns {Error.model} 400 - Bad request
         * @returns {Error.model} 404 - Not found
         */
        this.router.delete('/:id', this.remove);
        /**
         * Get a product detail
         * Access level: Admin, Agent
         * @route GET /products/{id}
         * @group Product
         * @security JWT
         * @param {string} id.path.required - Product ID
         * @returns {Product.model} 200
         * @returns {Error.model} 403 - Forbidden error
         * @returns {Error.model} 500 - Internal error
         * @returns {Error.model} 404 - Not found
         * @returns {Error.model} 400 - Bad request
         * @returns {Error.model} 404 - Not found
         * @returns {Error.model} 500 - Internal error
         * @returns {Error.model} 400 - Bad request
         * @returns {Error.model} 404 - Not found
         */
        this.router.get('/:id', this.findById);
    }
}
exports.default = ProductController;
