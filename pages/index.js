"use client";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../utils/api";
import Link from "next/link";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [articles, setArticles] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await fetch("/api/featured-recipes");
        const testimonialsResponse = await fetch("/api/testimonials");
        const articlesResponse = await fetch("/api/articles");

        setFeaturedRecipes(await recipesResponse.json());
        setTestimonials(await testimonialsResponse.json());
        setArticles(await articlesResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-20 p-6 max-w-6xl mx-auto">
        {" "}
        <div
          className="relative bg-cover bg-center h-[400px]"
          style={{ backgroundImage: "url(/images/hero.jpg)" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold">Welcome to Dishly</h1>
            <p className="mt-4 text-lg">
              Discover, Cook, and Enjoy Delicious Recipes
            </p>
            <button className="mt-6 bg-[#288537] px-6 py-3 text-white rounded-lg hover:bg-green-600">
              Explore Now
            </button>
          </div>
        </div>
        <div className="py-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Breakfast",
              "Lunch",
              "Dinner",
              "Desserts",
              "Snacks",
              "Healthy",
              "Quick Meals",
            ].map((category) => (
              <button
                key={category}
                className="bg-[#f4f4f4] hover:bg-[#288537] hover:text-white py-4 rounded shadow text-gray-800"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
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
              <option value="chinese">French</option>
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
              className="bg-[#288537] text-white px-6 py-3 rounded w-full md:w-auto hover:bg-blue-600 transition"
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
                <img
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
                    className="text-[#288537] hover:underline"
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
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-sm text-gray-500">{recipe.description}</p>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-[#288537] hover:underline"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#f9f9f9] py-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">"{testimonial.message}"</p>
              <p className="text-right mt-4 text-sm font-bold">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Cooking Tips & Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.excerpt}</p>
                <Link
                  href={`/articles/${article.id}`}
                  className="text-[#288537] hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#288537] text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Dishly Community</h2>
        <p className="mb-6">
          Save your favorite recipes and discover new ones every day!
        </p>
        <Link
          href="/signup"
          className="bg-white text-[#288537] px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Sign Up Now
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
