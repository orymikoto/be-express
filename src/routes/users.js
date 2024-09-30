import express from "express";
import * as UsersController from "../controllers/users.js";
import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

// Get all users data
router.route("/").get(UsersController.getAllUsers);

// Get user data by id
router.route("/detail").get(verifyToken, UsersController.getUserById);

// Create new user
router.route("/create").post(UsersController.createNewUser);

// Update user by id
router.route("/update/:id").patch(UsersController.updateUserById);

// Delete user by id
router.route("/delete/:id").delete(UsersController.deleteUserById);

export default router;
