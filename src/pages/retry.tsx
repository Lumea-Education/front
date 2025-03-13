import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Retry: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/careers");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          We are currently going through a technical maintenance. We apologize
          you for this inconvenience. We kindly ask you to try again in a few
          hours.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (This will take just a moment...)
        </p>
      </div>
    </div>
  );
};

export default Retry;
