"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const shortid = __importStar(require("shortid"));
// @ts-ignore
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const ProductSchema = new mongoose_1.Schema({
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
            delete ret._id;
            delete ret.__v;
        },
    },
    toJSON: {
        // https://github.com/Automattic/mongoose/issues/4354
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
        },
    },
});
ProductSchema.plugin(mongoose_paginate_v2_1.default);
ProductSchema.plugin(mongoose_timestamp_1.default);
ProductSchema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    overrideMethods: true,
});
// @ts-ignore
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
