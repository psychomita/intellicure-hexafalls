import { FeaturesSection } from "@/components/features-section";
import { FadeText } from "@/components/magicui/fade-text";
import WordPullUp from "@/components/magicui/word-pull-up";

export default function Home() {
  return (
    <div className="">
      <div
        className="flex h-full min-h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/assets/images/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 h-full bg-black/65"></div>
        <div className="relative h-full py-10">
          <div className="container z-10 flex flex-col">
            <div className="grid grid-cols-1">
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                {/* <a href="/blog/intro">
        <div className="group rounded-full border border-black/5 bg-zinc-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-200 dark:border-white/5 dark:bg-zinc-900 dark:hover:bg-zinc-800">
          <p
            // style={{var(--shimmer-width):"100px"}}
            className="animate-shimmer mx-auto inline-flex max-w-md items-center justify-center bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent bg-clip-text bg-no-repeat px-4 py-1 text-zinc-600/70 transition ease-out [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] hover:text-zinc-600 hover:duration-300 dark:via-white/80 dark:text-zinc-400/70 hover:dark:text-zinc-400"
          >
            <span>✨ Introducing TrafficXpert </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </p>
        </div>
      </a> */}
                <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                  <WordPullUp
                    className="relative mx-0 text-balance pt-5 text-5xl font-bold tracking-tight text-white dark:text-white sm:max-w-[60.5rem] sm:text-7xl md:mx-auto md:px-4 md:py-2 md:text-center md:text-8xl lg:text-8xl"
                    words="From Confusion to Cure with AI"
                  />
                  {/* <span className="text-zinc-90 absolute -top-3.5 left-0 z-10 rotate-3 whitespace-nowrap rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white md:top-12 md:-rotate-12">
        Open-source
      </span> */}
                </div>
                <div className="max-w-[40rem]">
                  <FadeText
                    direction="up"
                    text="Optimize traffic flow, reduce congestion, and make data-driven decisions with our advanced AI-powered traffic management system."
                    className="text-balance text-lg tracking-tight text-black/70 text-zinc-300 dark:text-white md:text-xl"
                  />
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex gap-4 md:flex-row">
                    <a
                      className="group relative inline-flex h-10 w-full items-center justify-center gap-1 whitespace-pre rounded-full border border-input bg-background px-8 text-sm font-semibold tracking-tighter shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex"
                      href="/register"
                    >
                      Get Started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right ml-1 size-4 flex-shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </a>
                    <a
                      className="group relative inline-flex h-10 w-full items-center justify-center gap-1 overflow-hidden whitespace-pre rounded-full border border-input bg-background px-8 text-sm font-semibold tracking-tighter shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex"
                      href="/about"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right ml-1 size-4 flex-shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        id="features"
        className="mx-auto flex w-full flex-col items-center justify-center gap-y-6 py-32"
      >
        <h1>
          <span className="text-center text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            Features
          </span>
        </h1>
        <p>
          <span className="mt-4 text-center text-lg text-zinc-600 dark:text-zinc-400">
            Discover the features that make TrafficXpert the best choice for
            managing your daily commute.
          </span>
        </p>
        <FeaturesSection />
      </section>
      <section className="mx-auto flex w-full flex-col items-center justify-center bg-black py-32">
        <WordPullUp
          className="text-7xl font-bold text-zinc-200"
          words="Smart. Safe. Seamless."
          delayMultiple={1.0}
        />
      </section>
    </div>
  );
}