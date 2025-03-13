import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg"; // Default black logo
import LogoWhite from "../assets/logo_white.png"; // White logo for careers page

export default function Navigation() {
  const location = useLocation();
  const isCareersPage = location.pathname === "/careers";

  return (
    <div className="flex items-center justify-between pt-5 max-w-[1440px] mx-auto bg-transparent">
      <Link to="/">
        {/* Conditionally Render the Correct Logo */}
        <img
          src={isCareersPage ? LogoWhite : Logo}
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
      </Link>

      <div className="space-x-10">
        <Link to="/educators">
          <button
            className={`hover:cursor-pointer ${
              isCareersPage ? "text-white" : "text-black"
            }`}
          >
            educators
          </button>
        </Link>
        <Link to="/careers">
          <button
            className={`hover:cursor-pointer ${
              isCareersPage ? "text-white" : "text-black"
            }`}
          >
            careers
          </button>
        </Link>
        <Link to="/form">
          <button className="p-2.5 bg-primary-button text-white rounded-xl hover:cursor-pointer">
            Demo
          </button>
        </Link>
      </div>
    </div>
  );
}
