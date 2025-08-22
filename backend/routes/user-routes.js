import express from "express";
import { deleteUser, getAllUsers, login, signup, updateUser,updatePassword } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers);

userRouter.post("/signup"  , signup);

userRouter.put("/:id" , updateUser);

userRouter.delete("/:id" , deleteUser);

userRouter.post("/login",login)

userRouter.put("/update-password", verifyToken, updatePassword);


export default userRouter;