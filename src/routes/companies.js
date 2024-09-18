import express from "express";
import * as CompaniesController from "../controllers/companies.js";

const router = express.Router();

// Get all companies data
router.route("/").get(CompaniesController.getAllCompanies);

// Get user data by id
router.route("/:id").get(CompaniesController.getCompanyById);

// Create new user
router.route("/create").post(CompaniesController.createNewCompany);

// Add new position to company
router.route("/add-position/:id").post(CompaniesController.addCompanyPosition);

// // Update user by id
// router.route("/update/:id").patch(UsersController.updateUserById);

// // Delete user by id
// router.route("/delete/:id").delete(UsersController.deleteUserById);

export default router;
