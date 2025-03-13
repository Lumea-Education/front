export default function Cover() {
  return (
    <section className="relative md:h-screen md:my-10 my-56 w-full">
      {/* Gradient Overlay at the Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-30 bg-gradient-to-b from-[#031442] to-[#e9e9e9]"></div>

      {/* Text Content Positioned at Bottom Right */}
      <div className="absolute bottom-10 md:right-65 right-10">
        <h1 className="md:text-6xl text-2xl text-[#f7f6f6] font-bold">
          Build your legacy with us.
        </h1>
      </div>
    </section>
  );
}
