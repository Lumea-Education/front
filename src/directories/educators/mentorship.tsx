import Mentor from "../../assets/educator/mentorship.png";

export default function Mentorship() {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img src={Mentor} alt="Mentor" className="w-full h-auto object-cover" />

      {/* Text Content Positioned on the Right Middle */}
      <div className="absolute md:right-70 md:top-50 md:-translate-y-1/2 bg-white/70 p-5 rounded-lg md:max-w-md w-full space-y-5">
        <h3 className="text-2xl text-neutral-body font-bold text-center">
          You are not alone in this journey.
        </h3>
        <div>
          <p className="text-base text-neutral-body">
            Seek out for mentors and colleagues.
          </p>
          <p className="text-base text-neutral-body">Teachers help teachers.</p>
        </div>
      </div>
    </div>
  );
}
