import slugify from "slugify";
import recipeModel from "../models/recipeModel.js";
import fs from "fs";

export const createRecipeController = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      ingredients,
      instructions,
      preparationTime,
      cookingTime,
      totalTime,
      servings,
      difficulty,
      cuisine,
      dietaryInformation,
      calories,
      nutritionalInformation,
      author,
      tags,
      notes,
    } = req.fields;
    const { image } = req.files;

    // Add Validation
    switch (true) {
      case !title:
        return res.status(400).send({ error: "Title is required." });
      // case !slug:
      //   return res.status(400).send({ error: "Slug is required." });
      case !category:
        return res.status(400).send({ error: "Category is required." });
      case !image && image.size > 1000000:
        return res.status(400).send({ error: "Image is required." });
      case !description:
        return res.status(400).send({ error: "Description is required." });
      case !ingredients:
        return res.status(400).send({ error: "Ingredients are required." });
      case !instructions:
        return res.status(400).send({ error: "Instructions are required." });
      case !preparationTime:
        return res.status(400).send({ error: "Preparation time is required." });
      case !cookingTime:
        return res.status(400).send({ error: "Cooking time is required." });
      case !totalTime:
        return res.status(400).send({ error: "Total time is required." });
      case !servings:
        return res.status(400).send({ error: "Servings are required." });
      case !difficulty:
        return res.status(400).send({ error: "Difficulty is required." });
      case !cuisine:
        return res.status(400).send({ error: "Cuisine is required." });
      case !nutritionalInformation:
        return res
          .status(400)
          .send({ error: "Nutritional information is required." });
      case !author:
        return res.status(400).send({ error: "Author is required." });
      default:
        // Your logic for processing the recipe data
        break;
    }

    const recipe = new recipeModel({ ...req.fields, slug: slugify(title) });
    if (image) {
      recipe.image.data = fs.readFileSync(image.path);
      recipe.image.contentType = image.type;
    }

    await recipe.save();
    res.status(201).send({
      success: true,
      message: "Recipe added successfully",
      recipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while creating recipe",
    });
  }
};

// Get All Recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total_recipes: recipes.length,
      message: "Successfully get all recipes",
      recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all recipes",
      error: error.message,
    });
  }
};

// Get Single Recipe
export const getSingleRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      recipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single recipe",
      error,
    });
  }
};

// Get Image
export const recipeImageController = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.rid).select("image");
    if (recipe.image.data) {
      res.set("Content-type", recipe.image.contentType);
      return res.status(200).send(recipe.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};

// Delete Recipe
export const deleteRecipeController = async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.rid).select("-image");
    res.status(200).send({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while deleting recipe",
      error,
    });
  }
};

// Update Recipe
export const updateRecipeController = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      ingredients,
      instructions,
      preparationTime,
      cookingTime,
      totalTime,
      servings,
      difficulty,
      cuisine,
      dietaryInformation,
      calories,
      nutritionalInformation,
      author,
      tags,
      notes,
    } = req.fields;
    const { image } = req.files;

    // Update Validation
    switch (true) {
      case !title:
        return res.status(400).send({ error: "Title is required." });
      // case !slug:
      //   return res.status(400).send({ error: "Slug is required." });
      case !category:
        return res.status(400).send({ error: "Category is required." });
      // case !image && image.size > 1000000:
      //   return res.status(400).send({ error: "Image is required." });
      case !description:
        return res.status(400).send({ error: "Description is required." });
      case !ingredients:
        return res.status(400).send({ error: "Ingredients are required." });
      case !instructions:
        return res.status(400).send({ error: "Instructions are required." });
      case !preparationTime:
        return res.status(400).send({ error: "Preparation time is required." });
      case !cookingTime:
        return res.status(400).send({ error: "Cooking time is required." });
      case !totalTime:
        return res.status(400).send({ error: "Total time is required." });
      case !servings:
        return res.status(400).send({ error: "Servings are required." });
      case !difficulty:
        return res.status(400).send({ error: "Difficulty is required." });
      case !cuisine:
        return res.status(400).send({ error: "Cuisine is required." });
      case !nutritionalInformation:
        return res
          .status(400)
          .send({ error: "Nutritional information is required." });
      case !author:
        return res.status(400).send({ error: "Author is required." });
      default:
        break;
    }

    const recipe = await recipeModel.findByIdAndUpdate(
      req.params.rid,
      {
        ...req.fields,
        slug: slugify(title),
      },
      { new: true }
    );
    if (image) {
      recipe.image.data = fs.readFileSync(image.path);
      recipe.image.contentType = image.type;
    }

    await recipe.save();
    res.status(201).send({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating recipe",
    });
  }
};

// Filters
export const recipeFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.calories = { $gte: radio[0], $lte: radio[1] };

    const recipes = await recipeModel.find(args);

    res.status(200).send({
      success: true,
      recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while filtering",
    });
  }
};

// Recipe Count
export const recipeCountController = async (req, res) => {
  try {
    const total = await recipeModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in recipe count",
      error,
    });
  }
};

// Recipe list based on page
export const recipeListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const recipes = await recipeModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page fetch",
      error,
    });
  }
};

// Recipe Search
export const searchRecipeController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await recipeModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { ingredients: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while searching recipe",
      error,
    });
  }
};

// Similar Recipe
export const relatedRecipeController = async (req, res) => {
  try {
    const { rid, cid } = req.params;
    const recipes = await recipeModel
      .find({
        category: cid,
        _id: { $ne: rid },
      })
      .select("-image")
      .limit(4)
      .populate("category");

    res.status(200).send({
      success: true,
      recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting similar recipe",
      error,
    });
  }
};
