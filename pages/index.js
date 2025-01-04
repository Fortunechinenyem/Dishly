"use client";
import { useState, useEffect } from "react";

import { fetchRecipes } from "../utils/api";
import RecipeList from "@/app/components/RecipeList";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes("dishes");
      console.log("Fetched Recipes:", data);
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Welcome to Dishly</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
