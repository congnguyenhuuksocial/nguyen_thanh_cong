import {
    NextFunction,
    Router,
    Response,
    Request,
} from "express";
import logger from "../util/logger";
import ProductService from "../services/product.service";
import {
    checkCreateProducts,
    checkDeleteProducts,
    checkGetAllProducts, checkGetProducts,
    checkUpdateProducts
} from "../middlewares/validations";
import {IProduct} from "../models/product.interface";
export default class ProductController {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    private routes() {
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
        this.router.get('/',
            this.list)

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
        this.router.post('/',
            this.create)

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
        this.router.put('/:id',
            this.update)

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
        this.router.delete('/:id',
            this.remove)

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
        this.router.get('/:id',
            this.findById)
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info(`POST /products: ${JSON.stringify(req.body)}`)

            // validate request body
            checkCreateProducts(req.body as IProduct)

            const product = await ProductService.create(req.body)
            res.json({
                message: 'Product created',
                data: product,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }
    public list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info(`GET /products: ${JSON.stringify(req.query)}`)
            const { page, limit } = req.query

            // validate request query
            checkGetAllProducts(Number(page), Number(limit))

            const products = await ProductService.list(Number(page), Number(limit))
            res.json({
                message: 'Product list',
                data: products,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info(`PUT /products/${req.params.id}: ${JSON.stringify(req.body)}`)

            // validate request body
            checkUpdateProducts({
                ...req.body,
                id: req.params.id,
            })
            const product = await ProductService.update(req.params.id, req.body)
            res.json({
                message: 'Product updated',
                data: product,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info(`DELETE /products/${req.params.id}`)

            // validate request params
            checkDeleteProducts(req.params.id)

            const product = await ProductService.remove(req.params.id)
            res.json({
                message: 'Product removed',
                data: product,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info(`GET /products/${req.params.id}`)

            // validate request params
            checkGetProducts(req.params.id)

            const product = await ProductService.findById(req.params.id)
            res.json({
                data: product,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }
}
