import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`/api/articles/${id}`);
          if (!response.ok) throw new Error("Failed to fetch article");
          const data = await response.json();
          setArticle(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!article) {
    return <p className="text-center text-gray-500">Loading article...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{article.date}</p>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <div className="text-lg text-gray-800 leading-relaxed">
          {article.content}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
