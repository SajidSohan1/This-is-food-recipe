import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createRecipeController,
  deleteRecipeController,
  getRecipes,
  getSingleRecipe,
  recipeCountController,
  recipeFiltersController,
  recipeImageController,
  recipeListController,
  relatedRecipeController,
  searchRecipeController,
  updateRecipeController,
} from "../controllers/recipeController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes
router.post("/add-recipe", requireSignIn, formidable(), createRecipeController);

// Get All Recipes
router.get("/get-recipe", getRecipes);

// Single Get
router.get("/get-recipe/:slug", getSingleRecipe);

// Get Image
router.get("/recipe-image/:rid", recipeImageController);

// Delete Recipe
router.delete("/delete-recipe/:rid", requireSignIn, deleteRecipeController);

// Update Recipe
router.put(
  "/update-recipe/:rid",
  requireSignIn,
  formidable(),
  updateRecipeController
);

// Filter Recipe
router.post("/recipe-filters", recipeFiltersController);

// Recipe Count
router.get("/recipe-count", recipeCountController);

// Recipe Per Page
router.get("/recipe-list/:page", recipeListController);

// Search Recipe
router.get("/search/:keyword", searchRecipeController);

// Similar Recipe
router.get("/related-recipe/:rid/:cid", relatedRecipeController);

export default router;
