import {
  Document,
  Schema,
  PaginateModel, model,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import * as shortid from "shortid";
// @ts-ignore
import mongooseTimestamp from "mongoose-timestamp";
import mongooseDelete from "mongoose-delete";
import {IProductModel} from "./product.interface";

const ProductSchema = new Schema({
_id: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
     type: String,
  },
  category: {
     type: String,
  },
  stock: {
     type: Number,
  },
  image: {
     type: String,
  },
  status: {
    type: String,
    default: 'active',
  },
}, {
  _id: false,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  },
  toJSON: {
    // https://github.com/Automattic/mongoose/issues/4354
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  },
})

ProductSchema.plugin(mongoosePaginate)
ProductSchema.plugin(mongooseTimestamp)
ProductSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
})


interface ProductModel<T extends Document> extends PaginateModel<T> { }
// @ts-ignore
export const Product: ProductModel<IProductModel> = model<IProductModel>('Product', ProductSchema)
