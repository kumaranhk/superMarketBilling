import express from "express";
import userRouter from "../src/controllers/users/user.routes.js";
import customerRouter from "../src/controllers/customers/customer.routes.js";
import authRouter from "../src/controllers/log-in/logIn.rotues.js";
import { authMiddleware } from "../src/middlewares/authMiddleware.js";

const router = express.Router();

router.use('/user',authMiddleware, userRouter);
router.use('/customer', customerRouter);
router.use('/auth', authRouter);

export default router;