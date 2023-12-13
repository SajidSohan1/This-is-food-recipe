import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  // Get all recipes
  const getAllRecipes = async () => {
    try {
      const { data } = await axios.get("/api/v1/recipe/get-recipe");
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong.`);
    }
  };

  // Lifecycle method for inital calling
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9 ">
          <h1 className="text-center">All Recipes</h1>

          <div className="d-flex flex-wrap">
            {recipes?.map((r) => (
              <Link
                key={r._id}
                to={`/dashboard/admin/recipe/${r.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/recipe/recipe-image/${r._id}`}
                    className="card-img-top"
                    alt={r.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{r.title}</h5>
                    <p className="card-text">{r.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipe;
