import {PaginateResult} from "mongoose";
import {IProductModel} from "../models/product.interface";
import {Product} from "../models/product.model";

namespace ProductService {
    const fieldSelection = [
        'name',
        'price',
        'stock',
        'description',
        'category',
        'image',
        'status',
        'createdAt',
        'updatedAt',
    ]

    /**
     * List all products with pagination
     * @param page number of page
     * @param limit number of items per page
     * @returns PaginateResult<IProductModel>
     */
    export const list = async (
        page: number = 1,
        limit: number = 30,
    ): Promise<PaginateResult<IProductModel>> => {
        return await Product.paginate({}, {
            page,
            limit,
            select: fieldSelection.join(' '),
            sort: '-updatedAt',
        })
    }

    /**
     * Create a new product data
     * @param data IProductModel data
     * @returns IProductModel data
     */
    export const create = async (data: IProductModel): Promise<IProductModel> => {
        return await Product.create(data)
    }

    /**
     * Update a product data
     * @param id product id to update
     * @param data IProductModel data
     * @returns IProductModel data
     */
    export const update = async (id: string, data: IProductModel): Promise<IProductModel> => {
        return Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }) as unknown as IProductModel;
    }

    /**
     * Remove a product data
     * @param id product id to remove
     * @returns IProductModel data
     * @throws Error
     */
    export const remove = async (id: string): Promise<IProductModel> => {
        return Product.findByIdAndDelete(id) as unknown as IProductModel;
    }

    /**
     * Find a product by id
     * @param id product id to find
     * @returns IProductModel data
     */
    export const findById = async (id: string): Promise<IProductModel> => {
        return Product.findById(id) as unknown as IProductModel;
    }
}

export = ProductService;
