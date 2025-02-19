import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true
        },
        barcode: {
            type: String,
            requried: true
        },
        price: {
            type: Number,
            requried: true,
            min: 1
        },
        stock: {
            type: Number,
            requried: true,
            default: 0
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const productModel = new mongoose.model('Product', productSchema, 'prodicts');

export default productModel;
