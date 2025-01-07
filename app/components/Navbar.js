import { Logo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl flex justify-between font-bold text-[#288537]">
          <Link href="/">
            <Image src={Logo} alt="logo" width={50} height={50} />
          </Link>
          <p className="mt-5">Dishly</p>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/recipes" className="text-gray-700 hover:text-blue-600">
            Recipes
          </Link>
          <Link href="/favorites" className="text-gray-700 hover:text-blue-600">
            Favorites
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded p-2 pl-10 pr-4 text-gray-700"
            />
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <p>Welcome, {session.user.name}!</p>
              <button
                onClick={() => signOut()}
                className="text-red-500 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white shadow-md p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/recipes" className="text-gray-700 hover:text-blue-600">
              Recipes
            </Link>
            <Link
              href="/favorites"
              className="text-gray-700 hover:text-blue-600"
            >
              Favorites
            </Link>
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="border rounded p-2 w-full text-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
