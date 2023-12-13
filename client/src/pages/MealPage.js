import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useMeal } from "../context/meal";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const MealPage = () => {
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

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello, ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {meal?.length > 1
                ? `You have ${meal.length} recipes in your meal plan ${
                    auth?.token ? "" : "Please login to make meal plans"
                  }`
                : "You didn't add any recipe to make a meal plan."}
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-8 ">
            {meal?.map((r) => (
              <div className="row mb-2 card flex-row recipe-details ">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/recipe/recipe-image/${r._id}`}
                    className="card-img-top recipe-image"
                    alt={r.title}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{r.title}</h4>
                  <p>{r.description}</p>

                  <div className="detail-item">
                    <h6 className="detail-title">Preparation Time:</h6>
                    <p className="detail-value">{r.preparationTime} minutes</p>
                  </div>

                  <div className="detail-item">
                    <h6 className="detail-title">Dietary Information:</h6>
                    <p className="detail-value">{r.dietaryInformation}</p>
                  </div>
                  <div className="detail-item">
                    <h6 className="detail-title">Calories:</h6>
                    <p className="detail-value">{r.calories} kcal</p>
                  </div>
                  <div className="detail-item">
                    <h6 className="detail-title">Nutritional Information:</h6>
                    <p className="detail-value">{r.nutritionalInformation}</p>
                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeMealRecipe(r._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Meal Plan Summary</h4>
            <p>Total| Make Plan</p>
            <hr />
            <h4>Total Calories: {totalCalory()}⚡</h4>

            <div className="mb-5">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/user/planned-meals")}
                >
                  See in Details
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
                  Login to see more meal plan details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealPage;
