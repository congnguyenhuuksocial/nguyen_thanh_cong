import {Document, PaginateResult} from 'mongoose'
import paginate from 'mongoose-paginate-v2'

export interface IProduct {
    name: string
    price: number
    stock: number
    description: string
    category: string
    image: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export type IProductPaginate = PaginateResult<IProduct>
export interface IProductModel extends IProduct, Document {}
