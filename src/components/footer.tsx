import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="py-36 space-y-3 bg-gradient-to-b from-[#e9e9e9] to-[#2b2b2b]">
      <div className="md:max-w-[1440px] px-6 md:px-0 mx-auto space-y-3.5">
        <h3 className="text-h3-reg-1 text-[#f7f6f6] hidden md:block">
          Learning is a journey. Keep moving forward.
        </h3>
        <h3 className="text-h3-reg-1 text-[#f7f6f6] md:hidden block">
          Learning is a journey. <br />
          Keep moving forward.
        </h3>
        <p className="text-neutral-highlight">
          What's one new thing you learned today? Share with us using
          #KeepLearning
        </p>
        <div className="my-16 grid grid-cols-3 max-w-3xs w-fit mx-0 space-x-32 text-[#f7f6f6]">
          <Link to="/faq">
            <button className="hover:cursor-pointer">FAQ</button>
          </Link>
          <Link to="/blog">
            <button className="hover:cursor-pointer">Blog</button>
          </Link>
          <Link to="/contact">
            <button className="hover:cursor-pointer">Contact</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
