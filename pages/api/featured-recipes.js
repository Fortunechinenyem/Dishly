export default function handler(req, res) {
  const featuredRecipes = [
    {
      id: 1,
      image: "/images/hero.jpg",
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
    },
    {
      id: 2,
      image: "/images/hero.jpg",
      title: "Vegetable Stir Fry",
      description: "Healthy and quick to prepare.",
    },
    {
      id: 3,
      image: "/images/hero.jpg",
      title: "Chocolate Cake",
      description: "A rich and moist dessert.",
    },
  ];

  res.status(200).json(featuredRecipes);
}
