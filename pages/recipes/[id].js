import { useRouter } from "next/router";

export default function RecipeDetails({ recipe }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!recipe) {
    return (
      <p className="text-center text-red-500">
        Recipe not found. Please try searching again.
      </p>
    );
  }

  const saveToFavorites = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Recipe saved to favorites!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <div className="relative w-full h-96 mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        ></p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => saveToFavorites(recipe)}
          className="bg-[#288537] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow-lg"
        >
          Save to Favorites
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    );

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return { notFound: true };
    }

    const recipe = await response.json();

    return {
      props: { recipe },
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    return { notFound: true };
  }
}
