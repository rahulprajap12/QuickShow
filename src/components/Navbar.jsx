import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">

      <Link to="/" className="max-md:flex-1">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto"
        />
      </Link>

      <div
        className={`${
          isOpen ? "w-full" : "max-md:w-0"
        } max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
        max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen
        md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 overflow-hidden transition-all duration-300`}
      >
        <X
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white"
        />

        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        <Link to="/movies" onClick={() => setIsOpen(false)}>
          Movies
        </Link>

        <Link to="/theaters" onClick={() => setIsOpen(false)}>
          Theaters
        </Link>

        <Link to="/releases" onClick={() => setIsOpen(false)}>
          Releases
        </Link>

        <Link to="/favorite" onClick={() => setIsOpen(false)}>
          Favorite
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Search className="hidden md:block w-6 h-6 cursor-pointer" />

        <Menu
          onClick={() => setIsOpen(true)}
          className="md:hidden w-8 h-8 cursor-pointer"
        />

        <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;