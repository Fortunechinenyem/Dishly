export default async function handler(req, res) {
  const { query } = req.query; // Extract query from the request

  console.log("Query received:", query); // Debugging log

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.API_KEY}`
    );

    console.log("Spoonacular API response status:", response.status);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch recipes" });
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
