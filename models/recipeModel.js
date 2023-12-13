import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    dietaryInformation: {
      type: String,
    },
    calories: {
      type: Number,
    },
    nutritionalInformation: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
