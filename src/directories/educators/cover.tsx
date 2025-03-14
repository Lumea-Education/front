import { FaArrowDown } from "react-icons/fa";

export default function Cover() {
  return (
    <section>
      <div className="flex items-center md:max-w-[1440px] mx-auto px-11 md:px-0">
        <div
          className="rounded-2xl w-full my-11 space-y-96 md:block hidden"
          style={{
            background: `linear-gradient(to bottom, 
            rgba(233, 233, 233, 0.3), 
            rgba(100, 100, 100, 0.5) 75%, 
            rgba(53, 53, 53, 0.8) 100%)`,
          }}
        >
          <div className="p-8 rounded-xl text-[#f7f6f6] grid grid-cols-3 text-center">
            <h1 className="text-7xl text-primary-highlight">Teach.</h1>
            <h1 className="text-7xl text-primary-highlight">Impact.</h1>
            <h1 className="text-7xl text-primary-highlight">Thrive.</h1>
          </div>
          <div className="text-center pb-8">
            <h1 className="text-5xl text-neutral-highlight text-black">
              You are not just an instructor. You are a{" "}
              <span className="text-5xl text-primary-brown">game-changer</span>.
            </h1>
          </div>
        </div>

        <div className="rounded-2xl w-full my-5 space-y-8 mt-20 md:mt-0 md:hidden block">
          <div className="p-8 rounded-xl text-[#f7f6f6] grid grid-cols-1 text-center space-y-4">
            <h1 className="text-4xl text-primary-highlight">Teach.</h1>
            <h1 className="text-4xl text-primary-highlight">Impact.</h1>
            <h1 className="text-4xl text-primary-highlight">Thrive.</h1>
          </div>
          <div className="text-center pb-8">
            <h1 className="text-2xl text-black">
              You are not just an instructor. You are a{" "}
              <span className="text-2xl text-primary-brown">game-changer</span>.
            </h1>
          </div>
        </div>
      </div>

      <div className="my-6 space-y-3 text-[#f7f6f6] md:block hidden">
        <p className="text-center">More Info</p>
        <FaArrowDown className="mx-auto text-3xl" />
      </div>
    </section>
  );
}
