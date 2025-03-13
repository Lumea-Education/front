import { Link } from "react-router-dom";
import Performance from "../../assets/student/progress.jpg";
export default function Achievements() {
  return (
    <div>
      <div className="py-14 bg-neutral-brown">
        <div className="py-14 text-center space-y-5 md:max-w-[1440px] md:mx-auto px-6 md:px-0">
          <h1 className="md:text-h3-reg-1 text-xl">
            <span className="text-secondary-helper text-xl">Small wins</span>{" "}
            lead to Big Achievements
          </h1>
          <p className="md:w-2/6 w-full mx-auto">
            Stay on track with progress tracker, see your growth, celebrate
            milestones, and stay motivated to keep learning.
          </p>
        </div>
      </div>
      <div className="my-14 px-6 md:px-0">
        <img
          src={Performance}
          alt="Performance"
          className="mx-auto rounded-2xl"
        />
      </div>
      <div className="text-center md:max-w-[1440px] mx-auto px-6 md:px-0">
        <Link to="/form">
          <button className="bg-primary-button rounded-xl w-full md:w-fit p-2.5 text-[#f7f6f6] hover:cursor-pointer">
            Sign Up for Early Access
          </button>
        </Link>
      </div>
    </div>
  );
}
