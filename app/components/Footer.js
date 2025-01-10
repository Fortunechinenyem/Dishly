import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between md:flex-row flex-col gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-2">Dishly</h3>
            <p className="text-sm">Your go-to app for all things recipes!</p>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <Link href="/" className="text-gray-300 hover:text-blue-400">
                Home
              </Link>
              <Link
                href="/recipes"
                className="text-gray-300 hover:text-blue-400"
              >
                Recipes
              </Link>
              <Link
                href="/favorites"
                className="text-gray-300 hover:text-blue-400"
              >
                Favorites
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-blue-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Dishly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
