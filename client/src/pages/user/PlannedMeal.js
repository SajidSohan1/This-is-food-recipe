import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

import { useMeal } from "../../context/meal";
import { useNavigate } from "react-router-dom";

const PlannedMeal = () => {
  const [meal, setMeal] = useMeal();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Delete meal plan recipe
  const removeMealRecipe = (rid) => {
    try {
      let myMeal = [...meal];
      let index = myMeal.findIndex((item) => item._id === rid);
      myMeal.splice(index, 1);
      setMeal(myMeal);
      localStorage.setItem("meal", JSON.stringify(myMeal));
    } catch (error) {
      console.log(error);
    }
  };

  // Total calories
  const totalCalory = () => {
    try {
      let total = 0;
      meal?.map((item) => {
        total = total + item.calories;
      });
      return total.toLocaleString("en-US");
    } catch (error) {
      console.log(error);
    }
  };

  const allIngredients = () => {
    try {
      let ingredients = "";
      meal?.map((item) => {
        ingredients = ingredients + item.ingredients;
      });
      return ingredients.toLocaleString("en-US");
    } catch (error) {
      console.log(error);
    }
  };

  const allRecipes = () => {
    try {
      let ingredients = "";
      meal?.map((item) => {
        ingredients = ingredients + item.title + ", ";
      });
      return ingredients.toLocaleString("en-US");
    } catch (error) {
      console.log(error);
    }
  };

  const allNutrition = () => {
    try {
      let ingredients = "";
      meal?.map((item) => {
        ingredients = ingredients + item.nutritionalInformation + ". ";
      });
      return ingredients.toLocaleString("en-US");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9 p-4 text-center recipe-details">
            <div className="col-md-12 rec">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {meal?.length > 1
                  ? `You have ${meal.length} recipes in your meal plan ${
                      auth?.token ? "" : "Please login to make meal plans"
                    }`
                  : "You didn't add any recipe to make a meal plan."}
              </h4>
            </div>
            <h4>Meal Plan Summary</h4>
            <p>Total | Get Overall Information</p>
            <hr />
            <h6>All Nutrition</h6>
            <p>{allNutrition()}</p>

            <hr />
            <h6>All Ingredients for All These Recipes at a Glance</h6>
            <p>{allIngredients()}</p>

            <hr />
            <h6>Recipe List</h6>
            <p>{allRecipes()}</p>

            <hr />
            <h4>Total Calories: {totalCalory()}⚡</h4>
            <div className="mb-5">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/")}
                >
                  🍅 Add More
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/meal",
                    })
                  }
                >
                  Login to make meal plan
                </button>
              )}
            </div>

            <div className="row"></div>
            <div className="row mt-2 d-flex justify-content-center">
              <div className="col-md-10 ">
                {meal?.map((r) => (
                  <div className="row mb-2 card flex-row recipe-details ">
                    <div className=" row mt-2 d-flex justify-content-cente">
                      <h1>{r.title}</h1>
                      <img
                        src={`/api/v1/recipe/recipe-image/${r._id}`}
                        className="card-img-top recipe-image"
                        alt={r.title}
                      />
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() => removeMealRecipe(r._id)}
                      >
                        Remove
                        <hr />
                        <h6>Calories: -{r.calories}</h6>
                      </button>
                    </div>

                    <div className="col-md-12">
                      {/* <h4>{r.title}</h4>
                      <p>{r.description}</p> */}

                      <div className="col-md-12">
                        <div className="recipe-details">
                          <div className="detail-item">
                            <h6 className="detail-title">Name:</h6>
                            <p className="detail-value">{r.title}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Category:</h6>
                            <p className="detail-value">{r.category?.name}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Description:</h6>
                            <p className="detail-value">{r.description}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Ingredients:</h6>
                            <p className="detail-value">{r.ingredients}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Instructions:</h6>
                            <p className="detail-value">{r.instructions}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Preparation Time:</h6>
                            <p className="detail-value">
                              {r.preparationTime} minutes
                            </p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Cooking Time:</h6>
                            <p className="detail-value">
                              {r.cookingTime} minutes
                            </p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Total Time:</h6>
                            <p className="detail-value">
                              {r.totalTime} minutes
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="recipe-details">
                          <div className="detail-item">
                            <h6 className="detail-title">Servings:</h6>
                            <p className="detail-value">{r.servings}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Difficulty:</h6>
                            <p className="detail-value">{r.difficulty}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Cuisine:</h6>
                            <p className="detail-value">{r.cuisine}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">
                              Dietary Information:
                            </h6>
                            <p className="detail-value">
                              {r.dietaryInformation}
                            </p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Calories:</h6>
                            <p className="detail-value">{r.calories} kcal</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">
                              Nutritional Information:
                            </h6>
                            <p className="detail-value">
                              {r.nutritionalInformation}
                            </p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Author:</h6>
                            <p className="detail-value">{r.author}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Tags:</h6>
                            <p className="detail-value">{r.tags}</p>
                          </div>
                          <div className="detail-item">
                            <h6 className="detail-title">Notes:</h6>
                            <p className="detail-value">{r.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4 text-center">
                {/* <h4>Meal Plan Summary</h4>
                <p>Total | Get Overall Information</p>
                <hr />
                <h6>All Nutrition</h6>
                <p>{allNutrition()}</p>

                <hr />
                <h6>All Ingredients for All These Recipes at a Glance</h6>
                <p>{allIngredients()}</p>

                <hr />
                <h6>Recipe List</h6>
                <p>{allRecipes()}</p> */}

                {/* <hr />
                <h4>Total Calories: {totalCalory()}⚡</h4>
                <div className="mb-5">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/")}
                    >
                      🍅 Add More
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/meal",
                        })
                      }
                    >
                      Login to make meal plan
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlannedMeal;
