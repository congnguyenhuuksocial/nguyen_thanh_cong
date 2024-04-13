import {
    NextFunction,
    Request,
    Response,
} from "express";
import Joi from "joi";
import {Error} from "mongoose";
import {IProduct} from "../models/product.interface";
import logger from "../util/logger";

export const checkCreateProducts = (product: IProduct) => {
    logger.info('checkCreateProducts: ', JSON.stringify(product))
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(1).required(),
        stock: Joi.number().min(1).required(),
        description: Joi.string().min(1).max(300).optional(),
        category: Joi.string().min(1).max(100).optional(),
        image: Joi.string().optional(),
    })
    const { error } = schema.validate(product)
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
}

type ID = string
export const checkUpdateProducts = (product: IProduct & ID) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        price: Joi.number().min(1).optional(),
        stock: Joi.number().min(1).optional(),
        description: Joi.string().min(1).max(300).optional(),
        category: Joi.string().min(1).max(100).optional(),
        image: Joi.string().optional(),
    })
    const { error } = schema.validate(product)
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
}

export const checkDeleteProducts = (id: ID) => {
    const schema = Joi.string().required()
    const { error } = schema.validate(id)
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
}

export const checkGetProducts = (id: ID) => {
    const schema = Joi.string().required()
    const { error } = schema.validate(id)
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
}

export const checkGetAllProducts = (page: number, limit: number) => {
    const schema = Joi.object({
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).required(),
    })
    const { error } = schema.validate({page, limit})
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
}

