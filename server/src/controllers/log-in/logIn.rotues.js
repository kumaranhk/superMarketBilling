import express from "express";
import { logIn } from "./logIn,controller.js";

const authRouter = express.Router();

authRouter.post('/log-in', logIn);

export default authRouter;