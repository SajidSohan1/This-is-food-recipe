import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddRecipe = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryInformation, setDietaryInformation] = useState("");
  const [calories, setCalories] = useState("");
  const [nutritionalInformation, setNutritionalInformation] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");

  // Get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Add recipe
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const recipeData = new FormData();

      recipeData.append("title", title);
      recipeData.append("category", category);
      recipeData.append("description", description);
      recipeData.append("ingredients", ingredients);
      recipeData.append("instructions", instructions);
      recipeData.append("preparationTime", preparationTime);
      recipeData.append("cookingTime", cookingTime);
      recipeData.append("totalTime", totalTime);
      recipeData.append("servings", servings);
      recipeData.append("difficulty", difficulty);
      recipeData.append("cuisine", cuisine);
      recipeData.append("dietaryInformation", dietaryInformation);
      recipeData.append("calories", calories);
      recipeData.append("nutritionalInformation", nutritionalInformation);
      recipeData.append("author", author);
      recipeData.append("tags", tags);
      recipeData.append("notes", notes);
      recipeData.append("image", image);

      const { data } = axios.post("/api/v1/recipe/add-recipe", recipeData);

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Recipe added successfully.");
        navigate("/dashboard/admin/recipes");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Add Recipe</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  ></input>
                </label>
              </div>
              <div className="mb-3">
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="food_image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Write a title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={ingredients}
                  placeholder="Write ingredients"
                  className="form-control"
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={instructions}
                  placeholder="Write instructions"
                  className="form-control"
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={preparationTime}
                  placeholder="Enter preparation time"
                  className="form-control"
                  onChange={(e) => setPreparationTime(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={cookingTime}
                  placeholder="Enter cooking time"
                  className="form-control"
                  onChange={(e) => setCookingTime(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={totalTime}
                  placeholder="Enter total time"
                  className="form-control"
                  onChange={(e) => setTotalTime(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={servings}
                  placeholder="Enter number of servings"
                  className="form-control"
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={difficulty}
                  placeholder="Enter difficulty level"
                  className="form-control"
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={cuisine}
                  placeholder="Enter cuisine type"
                  className="form-control"
                  onChange={(e) => setCuisine(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={dietaryInformation}
                  placeholder="Enter dietary information"
                  className="form-control"
                  onChange={(e) => setDietaryInformation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={calories}
                  placeholder="Enter calorie count"
                  className="form-control"
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={nutritionalInformation}
                  placeholder="Enter nutritional information"
                  className="form-control"
                  onChange={(e) => setNutritionalInformation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={author}
                  placeholder="Enter author name"
                  className="form-control"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={tags}
                  placeholder="Enter tags"
                  className="form-control"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={notes}
                  placeholder="Enter notes"
                  className="form-control"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleAdd}>
                Add Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRecipe;
