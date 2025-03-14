import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navigation from "./navigation";
import Mobile from "./mobile";
import App from "../App";
import Footer from "./footer";
// Images
import Student from "../assets/student/student.jpg";
import GameChanger from "../assets/educator/game.jpeg";
import Network from "../assets/careers/legacy.jpg";

function RootComponent(): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBackgroundImage = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      return Student;
    } else if (location.pathname === "/educators") {
      return GameChanger;
    } else if (location.pathname === "/careers") {
      return Network;
    }
    return null;
  };

  const backgroundImage = getBackgroundImage();

  return (
    <>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Cover image"
          className="md:h-screen md:w-screen md:bg-cover bg-center absolute -z-50"
        />
      )}

      <div>
        {isMobile ? <Mobile /> : <Navigation />}
        <App />
        <Footer />
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  );
}
