import express from "express";
import { createCustomer, deleteCustomer, getCustomer, updateCustomer } from "./customers.controller.js";

const customerRouter = express.Router();

customerRouter.post('/', createCustomer);
customerRouter.get('/:id?', getCustomer);
customerRouter.put('/:id?', updateCustomer);
customerRouter.delete('/:id?', deleteCustomer);

export default customerRouter;