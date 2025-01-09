export default function handler(req, res) {
  const articles = [
    {
      id: 1,
      image: "/images/hero.jpg",
      title: "10 Tips for Perfect Baking",
      excerpt: "Learn how to bake like a pro with these simple tips.",
    },
    {
      id: 2,
      image: "/images/hero.jpg",
      title: "Healthy Meal Prep Ideas",
      excerpt: "Save time and eat healthy with these meal prep ideas.",
    },
    {
      id: 3,
      image: "/images/hero.jpg",
      title: "The Best Spices for Cooking",
      excerpt: "Discover the spices every kitchen should have.",
    },
  ];

  res.status(200).json(articles);
}
