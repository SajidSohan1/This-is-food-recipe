import { useState, useEffect, useContext, createContext } from "react";

const MealContext = createContext();

const MealProvider = ({ children }) => {
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    let existingMealRecipe = localStorage.getItem("meal");
    if (existingMealRecipe) setMeal(JSON.parse(existingMealRecipe));
  }, []);

  return (
    <MealContext.Provider value={[meal, setMeal]}>
      {children}
    </MealContext.Provider>
  );
};

const useMeal = () => useContext(MealContext);

export { useMeal, MealProvider };
