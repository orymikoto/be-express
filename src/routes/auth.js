import express from "express";
import * as AuthController from "../controllers/auth.js";

const router = express.Router();

// get follower list
router.route("/login").post(AuthController.login);

// Register a new user
router.route("/register").post(AuthController.register);

export default router;
