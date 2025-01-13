import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [categories, setCategories] = useState({});
  const [manualItem, setManualItem] = useState("");
  const [manualCategory, setManualCategory] = useState("");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const consolidatedList = consolidateIngredients(favorites);
    setShoppingList(consolidatedList);
    setCategories(categorizeItems(consolidatedList));
  }, []);

  const consolidateIngredients = (recipes) => {
    const ingredientMap = new Map();

    recipes.forEach((recipe) => {
      recipe.extendedIngredients.forEach((ingredient) => {
        const { name, amount, unit } = ingredient;

        if (ingredientMap.has(name)) {
          ingredientMap.set(name, {
            ...ingredientMap.get(name),
            amount: ingredientMap.get(name).amount + amount,
          });
        } else {
          ingredientMap.set(name, { name, amount, unit });
        }
      });
    });

    return Array.from(ingredientMap.values());
  };

  const categorizeItems = (ingredients) => {
    const categories = {};

    ingredients.forEach((item) => {
      const category = item.aisle || "Miscellaneous"; // Use "aisle" for categorization if available
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    return categories;
  };

  const handleAddManualItem = (e) => {
    e.preventDefault();
    if (manualItem.trim() && manualCategory.trim()) {
      const newItem = {
        name: manualItem,
        amount: 1,
        unit: "",
        category: manualCategory,
      };

      setShoppingList((prev) => [...prev, newItem]);
      setCategories((prev) => ({
        ...prev,
        [manualCategory]: [...(prev[manualCategory] || []), newItem],
      }));

      setManualItem("");
      setManualCategory("");
    }
  };

  const handleRemoveItem = (itemName, category) => {
    setShoppingList((prev) => prev.filter((item) => item.name !== itemName));
    setCategories((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.name !== itemName),
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping List</h1>

        <form
          onSubmit={handleAddManualItem}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Item Name"
            value={manualItem}
            onChange={(e) => setManualItem(e.target.value)}
            className="border p-3 rounded w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Category (e.g., Dairy)"
            value={manualCategory}
            onChange={(e) => setManualCategory(e.target.value)}
            className="border p-3 rounded w-full md:w-1/3"
          />
          <button
            type="submit"
            className="bg-[#288537] text-white px-6 py-3 rounded w-full md:w-auto hover:bg-blue-600 transition"
          >
            Add Item
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(categories).map((category) => (
            <div key={category} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 text-[#288537]">
                {category}
              </h2>
              <ul>
                {categories[category].map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>
                      {item.amount} {item.unit} {item.name}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.name, category)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {shoppingList.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No items in the shopping list.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingList;
