export const fetchRecipes = async (query) => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data.results;
};
