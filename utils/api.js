export const fetchRecipes = async (query) => {
  try {
    const response = await fetch(`/api/recipes?query=${query}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
