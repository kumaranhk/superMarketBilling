import express from "express";
import { createUser, deleteUser, getUser, updateUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.get('/:id?', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;