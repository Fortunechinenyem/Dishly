import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch("/api/favorites");
      const data = await response.json();
      setFavorites(data);
    };

    if (session) {
      fetchFavorites();
    }
  }, [session]);

  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.recipeId}
            className="bg-white shadow-md rounded-lg"
          >
            <Image
              src={favorite.image}
              alt={favorite.title}
              height={80}
              width={80}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{favorite.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
