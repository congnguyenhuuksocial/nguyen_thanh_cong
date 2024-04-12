import express from "express";
import ProductController from "../controllers/product.controller";

class Routes {
    public router: express.Router

    constructor() {
        this.router = express.Router()

        this.router.use('/products', (new ProductController().router))
    }
}

export default new Routes().router
