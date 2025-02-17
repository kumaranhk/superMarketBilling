import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true
        },
        email: {
            type: String,
            requried: true,
            unique: true
        },
        password: {
            type: String,
            requried: true,
            trim: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        role: {
            type: String,
            enum: ["admin", "cashier"],
            default: "admin"
        }
    },
    {
        timestamps: true
    }
);

const userModel = new mongoose.model('User', userSchema, 'users');

export default userModel;