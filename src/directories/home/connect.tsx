import Collaborate from "../../assets/student/collaborate.png";

export default function Connect() {
  return (
    <div className="relative md:w-full md:h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Collaborate})` }}
      />

      {/* Semi-transparent Background for Text (Moved to Top-Right) */}
      <div className="relative w-full h-full flex justify-end items-start p-10 lg:px-20 xl:px-40">
        <div className="rounded-xl w-2xl py-12 md:bg-neutral-highlight/20 bg-neutral-highlight/70 backdrop-blur-md space-y-6 p-5">
          <p className="font-inter md:text-xl text-base font-bold text-center">
            Connect, Collaborate, Grow Together
          </p>
          <p className="font-inter text-base text-center md:w-4/6 w-full mx-auto">
            Stay engaged with group discussions, study sessions, and interactive{" "}
            <span className="md:text-white">learning experience.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
