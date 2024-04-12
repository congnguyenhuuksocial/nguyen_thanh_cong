"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        this.router.use('/products', (new product_controller_1.default().router));
    }
}
exports.default = new Routes().router;
