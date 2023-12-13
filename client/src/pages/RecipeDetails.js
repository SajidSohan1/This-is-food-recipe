import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMeal } from "../context/meal";

const RecipeDetails = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  const navigate = useNavigate();
  const [meal, setMeal] = useMeal();

  // Initial details
  useEffect(() => {
    if (params?.slug) getRecipe();
  }, [params?.slug]);

  // Get Recipe
  const getRecipe = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/recipe/get-recipe/${params.slug}`
      );
      setRecipe(data?.recipe);
      getSimilarRecipe(data?.recipe._id, data?.recipe.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar recipes
  const getSimilarRecipe = async (rid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/recipe/related-recipe/${rid}/${cid}`
      );
      setRelatedRecipes(data?.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-2">
        <div className="row mt-2 d-flex justify-content-center">
          <div className="col-md-6">
            <img
              src={`/api/v1/recipe/recipe-image/${recipe._id}`}
              className="card-img-top recipe-image"
              alt={recipe.title}
            />
          </div>
          <div className="row container mt-2">
            <h1 className="text-center">Recipe Details</h1>
            <div className="col-md-6">
              <div className="recipe-details">
                <div className="detail-item">
                  <h6 className="detail-title">Name:</h6>
                  <p className="detail-value">{recipe.title}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Category:</h6>
                  <p className="detail-value">{recipe.category?.name}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Description:</h6>
                  <p className="detail-value">{recipe.description}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Ingredients:</h6>
                  <p className="detail-value">{recipe.ingredients}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Instructions:</h6>
                  <p className="detail-value">{recipe.instructions}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Preparation Time:</h6>
                  <p className="detail-value">
                    {recipe.preparationTime} minutes
                  </p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Cooking Time:</h6>
                  <p className="detail-value">{recipe.cookingTime} minutes</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Total Time:</h6>
                  <p className="detail-value">{recipe.totalTime} minutes</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="recipe-details">
                <div className="detail-item">
                  <h6 className="detail-title">Servings:</h6>
                  <p className="detail-value">{recipe.servings}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Difficulty:</h6>
                  <p className="detail-value">{recipe.difficulty}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Cuisine:</h6>
                  <p className="detail-value">{recipe.cuisine}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Dietary Information:</h6>
                  <p className="detail-value">{recipe.dietaryInformation}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Calories:</h6>
                  <p className="detail-value">{recipe.calories} kcal</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Nutritional Information:</h6>
                  <p className="detail-value">
                    {recipe.nutritionalInformation}
                  </p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Author:</h6>
                  <p className="detail-value">{recipe.author}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Tags:</h6>
                  <p className="detail-value">{recipe.tags}</p>
                </div>
                <div className="detail-item">
                  <h6 className="detail-title">Notes:</h6>
                  <p className="detail-value">{recipe.notes}</p>
                </div>
              </div>
            </div>
            <button
              className="btn btn-warning ms-1"
              class="btn btn-warning ms-1"
              onClick={() => {
                setMeal([...meal, recipe]);
                localStorage.setItem("meal", JSON.stringify([...meal, recipe]));
                toast.success("Recipe added to meal plan.");
              }}
            >
              Add to Meal
            </button>
          </div>
        </div>
      </div>
      <div className="detail-item">
        <h1>Similar Recipes</h1>
      </div>
      <div className="row">
        <div className="d-flex flex-wrap">
          {relatedRecipes?.map((r) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/recipe/recipe-image/${r._id}`}
                className="card-img-top"
                alt={r.title}
              />
              <div className="card-body">
                <h5 className="card-title">{r.title}</h5>
                <p className="card-text">{r.description.substring(0, 40)}...</p>
                <p className="card-text">{r.calories} Cal</p>
                <button
                  class="btn btn-primary ms-1"
                  onClick={() => navigate(`/recipe/${r.slug}`)}
                >
                  See Recipe
                </button>
                <button
                  class="btn btn-warning ms-1"
                  onClick={() => {
                    setMeal([...meal, r]);
                    localStorage.setItem("meal", JSON.stringify([...meal, r]));
                    toast.success("Recipe added to meal plan.");
                  }}
                >
                  Add to Meal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetails;
