export default function handler(req, res) {
  const testimonials = [
    {
      message: "Dishly has transformed my cooking experience!",
      name: "Jane Doe",
    },
    {
      message: "I love the variety of recipes available!",
      name: "John Smith",
    },
    {
      message: "The search and filters make it easy to find what I need.",
      name: "Alice Johnson",
    },
  ];

  res.status(200).json(testimonials);
}
