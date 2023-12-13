import React from "react";
import { useSearch } from "../context/search";
import { Layout } from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No recipe found"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((r) => (
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
                  <button class="btn btn-warning ms-1">Add to Meal</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
