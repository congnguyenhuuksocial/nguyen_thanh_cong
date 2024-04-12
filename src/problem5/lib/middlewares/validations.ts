import {
    NextFunction,
    Request,
    Response,
} from "express";
import Joi from "joi";
import {Error} from "mongoose";

export const checkGetProducts = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).required(),
    })
    const { error } = schema.validate(req.query)
    if (error) {
        next(new Error(error.message))
    } else {
        next()
    }
}
