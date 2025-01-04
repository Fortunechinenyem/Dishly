export const fetchRecipes = async (query, filters = {}) => {
  const { cuisine, diet, intolerances } = filters;

  const params = new URLSearchParams({
    query,
    cuisine,
    diet,
    intolerances,
    number: 10,
    apiKey: process.env.API_KEY,
  });

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
