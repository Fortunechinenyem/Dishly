import { FavoritesContext } from "@/context/FavoritesContext";
import Image from "next/image";
import { useContext } from "react";

const RecipeCard = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={recipe.image}
        alt={recipe.title}
        height={100}
        width={100}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-semibold mt-4">{recipe.title}</h2>
      <p className="text-gray-600 mt-2">
        {recipe.summary.substring(0, 100)}...
      </p>
      <button
        onClick={handleFavoriteToggle}
        className={`mt-4 py-2 px-4 rounded-lg ${
          isFavorite ? "bg-red-500" : "bg-blue-500"
        } text-white`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default RecipeCard;
