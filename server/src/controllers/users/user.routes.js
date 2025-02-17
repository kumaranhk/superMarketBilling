import express from "express";
import { getProduct } from "./user.controller.js";

const userRouter = express.Router();

userRouter.get('/',getProduct);

export default userRouter;