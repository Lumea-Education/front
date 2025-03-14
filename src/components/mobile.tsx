import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "/logo.svg";

export default function Mobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isCareersPage = location.pathname === "/careers";
  const isDemoPage = location.pathname === "/demo" || "form";
  const isContactPage = location.pathname === "/contact";

  return (
    <div className="px-6 flex md:hidden justify-between w-full py-5 items-center">
      <button onClick={toggleMenu}>
        <RxHamburgerMenu
          className={`text-2xl transition-colors ${
            isCareersPage ? "text-white" : "text-black"
          } ${isContactPage ? "text-black" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-[80vw] max-h-screen bg-slate-100 shadow overflow-y-scroll z-50 transition-transform duration-300 ease-in-out rounded-2xl box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px; ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="float-right px-10 pt-10" onClick={closeMenu}>
          <RxCross1 className="text-2xl" />
        </button>
        <ul className="py-24 px-10 space-y-5">
          <li
            className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 delay-200"
                : "-translate-x-full delay-[800ms]"
            }`}
          >
            <Link to="/" onClick={closeMenu}>
              <button className="p-2">home</button>
            </Link>
          </li>
          <li
            className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 delay-[400ms]"
                : "-translate-x-full delay-[600ms]"
            }`}
          >
            <Link to="/educators" onClick={closeMenu}>
              <button className="p-2">educators</button>
            </Link>
          </li>
          <li
            className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 delay-[600ms]"
                : "-translate-x-full delay-[400ms]"
            }`}
          >
            <Link to="/careers" onClick={closeMenu}>
              <button className="p-2">careers</button>
            </Link>
          </li>
          <li
            className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 delay-[800ms]"
                : "-translate-x-full delay-[200ms]"
            }`}
          >
            <Link to="/form" onClick={closeMenu}>
              <button className="p-2 rounded-2xl bg-primary-button text-white">
                demo
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          width={80}
          className={`transition-colors ${
            isDemoPage || isContactPage ? "" : "filter brightness-0 invert"
          }`}
        />
      </Link>

      <Link to="/contact">
        <button
          className={`transition-colors ${
            isCareersPage || isContactPage ? "text-black" : "text-black"
          }`}
        >
          contact
        </button>
      </Link>
    </div>
  );
}
