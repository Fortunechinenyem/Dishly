"use client";
import { useState } from "react";
import { fetchRecipes } from "../utils/api";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: "",
    intolerances: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchRecipes(query, filters);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Discover Recipes</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row items-center">
          <input
            type="text"
            placeholder="Search by ingredient or name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-3 rounded w-full md:w-1/3"
          />

          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="border p-3 rounded w-full md:w-1/4"
          >
            <option value="">All Cuisines</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
          </select>

          <select
            name="diet"
            value={filters.diet}
            onChange={handleFilterChange}
            className="border p-3 rounded w-full md:w-1/4"
          >
            <option value="">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
          </select>

          <select
            name="intolerances"
            value={filters.intolerances}
            onChange={handleFilterChange}
            className="border p-3 rounded w-full md:w-1/4"
          >
            <option value="">No Intolerances</option>
            <option value="gluten">Gluten</option>
            <option value="dairy">Dairy</option>
            <option value="peanut">Peanut</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded w-full md:w-auto hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </form>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={recipe.image}
                height={200}
                width={300}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes found</p>
      )}
    </div>
  );
};

export default HomePage;
