import { SuperShinyButton } from "../ui/superShinyButton";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="py-24 sm:py-32 px-6 sm:px-12 text-center overflow-x-clip relative"
    >
      
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold uppercase text-indigo-500 tracking-tight">
          Say
          <span className="text-white">
            It
          </span>
        </h1>
      

      <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-md mx-auto leading-relaxed text-secondary-foreground ">
        Collect <span className="font-bold">honest</span>, <span className="font-bold">anonymous feedback</span> from people who matter.
      </p>
      <div className="mt-16">
        <SuperShinyButton>Open dashboard</SuperShinyButton>
      </div>

      {/* Floating objects */}
      <div className="absolute h-42 w-42 top-10 bg-indigo-500/50 rounded-full blur-3xl -z-2 " />
      <div className="absolute h-72 w-72 top-60 -right-20 bg-indigo-500/40 rounded-full blur-3xl -z-2" />
      
    </section>
  );
};
