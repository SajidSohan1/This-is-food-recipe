import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  updateCategoryController,
  getCategory,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes

// Add Category
router.post("/add-category", requireSignIn, isAdmin, categoryController);

// Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get All Category
router.get("/get-category", getCategory);

// Single Category
router.get("/single-category/:slug", singleCategoryController);

// Delete Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
