import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model.js";

export const createUser = async (req, res) => {
    const { name, email, customerId, password, role } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) return res.status(208).json({ msg: "User already reported" });
        await userModel.create({ name, email, customerId, password, role });
        return res.status(StatusCodes.CREATED).json({ msg: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

export const updateUser = async (req, res) => {
    const { name, email, customerId, password, role } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already reported" });
        const newUser = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { name, email, customerId, password, role } });
        return res.status(StatusCodes.CREATED).json({ msg: "User created successfully", newUser });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

export const getUser = async (req, res) => {
    console.log(req.user ,"userrr");
    const { id } = req.params;
    try {
        if (id) {
            const user = await userModel.findOne({ _id: id }, { __v: 0 });
            return res.status(StatusCodes.OK).json({ data: user });
        }
        const users = await userModel.find({}, { __v: 0 });
        return res.status(StatusCodes.OK).json({ data: users });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user id is requried" });
        }
        const user = await userModel.findOne({ _id: id });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid user id" });
        await userModel.deleteOne({ _id: id });
        return res.status(StatusCodes.OK).json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}