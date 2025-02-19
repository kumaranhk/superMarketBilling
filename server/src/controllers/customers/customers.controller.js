import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customerModel from "../../models/customer.model.js";
import userModel from "../../models/user.model.js";

/**
* @desc  create a new customer and an admin user
* @route POST /api/customer/
* @access Public 
*/

export const createCustomer = async (req, res) => {
    const { name, email, address, contactPerson, password } = req.body;
    try {
        const existingCustomer = await customerModel.findOne({ email });
        const existingUser = await userModel.findOne({ email });
        if (existingCustomer || existingUser) {
            return res.status(208).json({ msg: "Already exists" });
        }
        const customer = await customerModel.create({ name, email, address, contactPerson });
        await userModel.create({ name, email, customerId: customer._id, role: 'admin', password });
        console.log({ name, email, address, contactPerson, password });
        return res.status(StatusCodes.CREATED).json({ customer });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: ReasonPhrases.INTERNAL_SERVER_ERROR
        });
    }
}

/**
* @desc  get customers or a individual customer
* @route GET /api/customer/:id?
* @access Protected 
*/

export const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const customer = await customerModel.findOne({ _id: id }, { __v: 0 });
            return res.status(StatusCodes.OK).json({ data: customer });
        }
        const customers = await customerModel.find({}, { __v: 0 });
        return res.status(StatusCodes.OK).json({ data: customers });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}

/**
* @desc  Update a customer
* @route PUT /api/customer/:id?
* @access Protected 
*/

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, contactPerson } = req.body;

    try {
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Customer id is requried" });
        }
        const customer = await customerModel.findOne({ _id: id });
        if (!customer) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid customer id" });
        const newCustomer = await customerModel.findByIdAndUpdate({ _id: id }, { $set: { name, email, address, contactPerson } });
        return res.status(StatusCodes.OK).json({ newCustomer });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

/**
* @desc  Delete a customer
* @route DELETE /api/customer/:id?
* @access Protected 
*/

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Customer id is requried" });
        }
        const customer = await customerModel.findOne({ _id: id });
        if (!customer) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid customer id" });
        await customerModel.deleteOne({ _id: id });
        return res.status(StatusCodes.OK).json({ msg: 'Customer deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}