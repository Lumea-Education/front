import Learn from "../../assets/student/learning.jpg";

export default function Learning() {
  return (
    <div className="relative">
      {/* Background Split - Full Width 적용 */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top Half - Light Color */}
        <div className="md:h-1/2 h-96 bg-[#e9e7e8] w-full"></div>
        {/* Bottom Half - Darker Color */}
        <div className="md:h-1/2 h-96 bg-[#e2ccc5] w-full"></div>
      </div>

      {/* Content Grid (크기 유지) */}
      <div className="relative md:grid md:grid-cols-2 md:gap-36 z-10 max-w-[1440px] mx-auto px-6 md:px-0 md:py-56 py-6 space-y-28">
        {/* Left Side (Image covering both colors) */}
        <div>
          <img
            src={Learn}
            alt="Learning"
            width={521}
            height={433}
            className="rounded-2xl"
          />
        </div>

        {/* Right Side (Text Content) */}
        <div className="space-y-10 md:space-y-0">
          <div className="h-1/2 flex flex-col items-center justify-center">
            <h3 className="md:text-h3-reg-1 text-neutral-body font-inter text-center text-lg">
              <span className="text-secondary-helper">Learning</span> isn't just
              about listening.
            </h3>
            <h3 className="md:text-h3-reg-1 text-neutral-body font-inter text-center text-lg">
              It's about building, testing, and creating.
            </h3>
          </div>
          <div className="h-1/2 flex items-center justify-center w-4/6 mx-auto">
            <p className="bg-[#f7f6f6] p-2.5 rounded-xl">
              Work on real-world projects, develop skills that employers
              actually look for and build a portfolio that proves what you can
              do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
