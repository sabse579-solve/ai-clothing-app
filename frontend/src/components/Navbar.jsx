// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import logo from "../assets/image.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">

      {/* Left section: logo + brand */}
      <div className="flex items-center gap-3">
         <img
          src={logo}
          alt="logo"
          className="h-50 w-50 object-contain"
        />
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
       
        <Link className="hover:text-gray-300" to="/">Home</Link>
        <Link className="hover:text-gray-300" to="/design-studio">Design Studio</Link>
        <Link className="hover:text-gray-300" to="/customize">Customize</Link>
        <Link className="hover:text-gray-300" to="/tryon">Try-On</Link>
        <Link className="hover:text-gray-300" to="/store">Store</Link>
      </div>

      {/* Mobile menu icon placeholder */}
      <div className="md:hidden flex items-center">
        <span className="text-xl">☰</span>
      </div>

    </nav>
  );
}

