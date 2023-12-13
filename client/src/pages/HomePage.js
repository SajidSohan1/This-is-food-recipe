import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Calories } from "../components/Calories";
import { useNavigate } from "react-router-dom";
import { useMeal } from "../context/meal";
import { Toast, toast } from "react-hot-toast";

export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [meal, setMeal] = useMeal();

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/recipe/recipe-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/recipe/recipe-list/${page}`);
      setLoading(false);
      setRecipes([...recipes, ...data.recipes]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get Recipes
  const getAllRecipes = async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get("/api/v1/recipe/get-recipe");
      const { data } = await axios.get(`/api/v1/recipe/recipe-list/${page}`);
      setLoading(false);

      setRecipes(data.recipes);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllRecipes();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterRecipe();
  }, [checked, radio]);

  // Get recipes by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered recipes
  const filterRecipe = async () => {
    try {
      const { data } = await axios.post(`/api/v1/recipe/recipe-filters`, {
        checked,
        radio,
      });
      setRecipes(data?.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter by Calories</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Calories?.map((cal) => (
                <div key={cal._id}>
                  <Radio value={cal.array}>{cal.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)} */}
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Recipes</h1>
          <div className="d-flex flex-wrap">
            {recipes?.map((r) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/recipe/recipe-image/${r._id}`}
                  className="card-img-top"
                  alt={r.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{r.title}</h5>
                  <p className="card-text">
                    {r.description.substring(0, 40)}...
                  </p>
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
                      localStorage.setItem(
                        "meal",
                        JSON.stringify([...meal, r])
                      );
                      toast.success("Recipe added to meal plan.");
                    }}
                  >
                    Add to Meal
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {recipes && recipes.length < total && (
              <button
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
