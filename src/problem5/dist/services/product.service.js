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
const product_model_1 = require("../models/product.model");
var ProductService;
(function (ProductService) {
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
    ];
    /**
     * List all products with pagination
     * @param page number of page
     * @param limit number of items per page
     * @returns PaginateResult<IProductModel>
     */
    ProductService.list = (...args_1) => __awaiter(this, [...args_1], void 0, function* (page = 1, limit = 30) {
        return yield product_model_1.Product.paginate({}, {
            page,
            limit,
            select: fieldSelection.join(' '),
            sort: '-updatedAt',
        });
    });
    /**
     * Create a new product data
     * @param data IProductModel data
     * @returns IProductModel data
     */
    ProductService.create = (data) => __awaiter(this, void 0, void 0, function* () {
        return yield product_model_1.Product.create(data);
    });
    /**
     * Update a product data
     * @param id product id to update
     * @param data IProductModel data
     * @returns IProductModel data
     */
    ProductService.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
        return product_model_1.Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    });
    /**
     * Remove a product data
     * @param id product id to remove
     * @returns IProductModel data
     * @throws Error
     */
    ProductService.remove = (id) => __awaiter(this, void 0, void 0, function* () {
        return product_model_1.Product.findByIdAndDelete(id);
    });
    /**
     * Find a product by id
     * @param id product id to find
     * @returns IProductModel data
     */
    ProductService.findById = (id) => __awaiter(this, void 0, void 0, function* () {
        return product_model_1.Product.findById(id);
    });
})(ProductService || (ProductService = {}));
module.exports = ProductService;
