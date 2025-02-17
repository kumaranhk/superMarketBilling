import express from "express";
import userRouter from "../src/controllers/users/user.routes.js";
import customerRouter from "../src/controllers/customers/customer.routes.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/customer', customerRouter);

export default router;