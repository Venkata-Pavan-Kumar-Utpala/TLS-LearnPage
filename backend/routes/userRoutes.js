import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import Payment from "../models/Payment.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
export default userRoutes;
