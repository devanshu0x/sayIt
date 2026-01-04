import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="py-24 sm:py-32 px-6 sm:px-12 text-center"
    >
    <div className="absolute h-32 w-32 top-10 bg-primary rounded-full blur-3xl" />
      <div >
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold uppercase text-primary tracking-tight">
          Say
          <span className="text-secondary">
            It
          </span>
        </h1>
      </div>

      <p className="mt-6 text-lg sm:text-xl max-w-md mx-auto text-secondary-foreground leading-relaxed">
        Where feedback stays honest and anonymous
      </p>

      <div className="flex justify-center gap-4 mt-10">
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
        <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold">
          Learn More
        </button>
      </div>
    </section>
  );
};
