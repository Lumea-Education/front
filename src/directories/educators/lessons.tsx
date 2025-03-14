import Lesson from "../../assets/educator/lesson.png";

export default function Lessons() {
  return (
    <div className="relative w-full">
      <img src={Lesson} alt="Lesson" className="w-full h-auto object-cover" />

      <div className="absolute md:right-65 md:top-1/2 md:-translate-y-1/2 bg-white/70 p-5 rounded-lg md:max-w-md space-y-5 px-6 md:px-0">
        <h3 className="text-2xl text-neutral-body font-bold text-center">
          Lessons made easy.
        </h3>
        <p className="text-base text-neutral-body">
          Would you like to spend more energy in teaching-only rather than
          overwhelming yourself with marketing on top of the teaching part?
        </p>
        <p className="text-base text-neutral-body">
          We've got you! Say 'no' to multiple takes to see how you do. Instead,
          talk to students real-time.
        </p>
      </div>
    </div>
  );
}
