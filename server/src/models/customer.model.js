import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            required: true
        },
        contactPerson: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const customerModel = new mongoose.model('Customer', customerSchema, 'customers');

export default customerModel;