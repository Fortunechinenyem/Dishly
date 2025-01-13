export default function handler(req, res) {
  const testimonials = [
    {
      message: "Dishly has transformed my cooking experience!",
      name: "Jayden Karo",
    },
    {
      message: "I love the variety of recipes available!",
      name: "Muri Okunola",
    },
    {
      message: "The search and filters make it easy to find what I need.",
      name: "Halley Berry",
    },
  ];

  res.status(200).json(testimonials);
}
