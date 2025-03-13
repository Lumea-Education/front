import { FaArrowDown } from "react-icons/fa";

export default function Cover() {
  return (
    <section>
      <div className="flex items-center">
        <div
          className="rounded-2xl w-full my-5 hidden md:block max-w-[1440px] mx-auto"
          style={{
            background: `linear-gradient(to bottom, 
            rgba(233, 233, 233, 0.3), 
            rgba(100, 100, 100, 0.5) 75%, 
            rgba(53, 53, 53, 0.8) 100%)`,
          }}
        >
          <div className="p-8 rounded-xl text-[#f7f6f6] md:mt-120">
            <h1 className="text-2xl font-bold text-black md:text-white">
              Still just watching?
            </h1>
            <h1 className="text-lg mt-2 text-black md:text-white">
              Let's do something for real and grow together.
            </h1>
          </div>
        </div>
        {/*  */}
        <div className="p-8 rounded-xl text-[#f7f6f6] md:mt-120 mt-28 block md:hidden">
          <h1 className="text-2xl font-bold text-black md:text-white">
            Still just watching?
          </h1>
          <h1 className="text-lg mt-2 text-black md:text-white">
            Let's do something for real and grow together.
          </h1>
        </div>
      </div>
      <div className="my-10 space-y-3 hidden md:block">
        <p className="text-center">More Info</p>
        <FaArrowDown className="mx-auto text-3xl" />
      </div>
    </section>
  );
}
