import {
    NextFunction,
    Router,
    Response,
    Request,
} from "express";
import {
    checkGetProducts
} from "../middlewares/validations";
import logger from "../util/logger";
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
    }
    private list(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info(`GET /products: ${JSON.stringify(req.query)}`)
            const { page, limit } = req.query

            checkGetProducts(req, res, next)
            res.json({
                message: 'List of products',
                page,
                limit,
            })
        } catch (e) {
            // @ts-ignore
            next(new Error(`Internal error: ${e.message}`))
        }
    }
}
