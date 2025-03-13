import { Link } from "react-router-dom";
import Teachers from "../../assets/educator/teachers.png";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Thrive() {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        src={Teachers}
        alt="Teachers"
        className="w-full object-cover md:py-80 pt-40 pb-10"
      />

      {/* Text Positioned Above Center */}
      <div className="absolute md:top-40 top-18 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <h3 className="md:text-2xl text-lg text-neutral-body text-center">
          Join us where real educators{" "}
          <span className="md:text-2xl text-lg text-neutral-body font-bold">
            thrive
          </span>
          .
        </h3>
      </div>

      {/*  */}
      <div className="text-center space-y-3">
        <div>
          <Link to="/form">
            <button className="p-2.5 bg-primary-button text-[#f7f6f6] rounded-xl hover:cursor-pointer">
              Sign Up for Early Access
            </button>
          </Link>
        </div>
        <div className="flex items-center space-x-3 justify-center">
          <div>
            <span className="text-blue-500 hover:underline">
              How does it work?
            </span>
          </div>
          <div>
            <FaLongArrowAltRight />
          </div>
        </div>
      </div>
    </div>
  );
}
