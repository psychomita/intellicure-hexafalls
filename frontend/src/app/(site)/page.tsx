import { FeaturesSection } from "@/components/features-section";
import { FadeText } from "@/components/magicui/fade-text";
import WordPullUp from "@/components/magicui/word-pull-up";
import { Card } from "@/components/ui/card";
import {
  Award,
  Brain,
  Heart,
  HeartHandshakeIcon,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

const translations = {
  mission: {
    title: "Our Mission",
    subtitle: "Making healthcare accessible, intelligent, and patient-centered",
    description:
      "We believe everyone deserves access to advanced healthcare technology. Our AI-driven platform democratizes medical expertise, providing instant insights and connecting patients with the care they need.",
    stats: [
      { number: "1M+", label: "Patients Helped" },
      { number: "95%", label: "Accuracy Rate" },
      { number: "24/7", label: "Availability" },
      { number: "50+", label: "Countries" },
    ],
  },
  footer: {
    description:
      "Transforming healthcare through artificial intelligence and compassionate care.",
    links: {
      product: "Product",
      company: "Company",
      support: "Support",
    },
  },
};

const t = translations;

export default function Home() {
  return (
    <div className="">
      <div
        className="flex h-full min-h-screen items-center justify-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg')",
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
    className="relative mx-0 text-balance pt-5 text-5xl font-bold text-white dark:text-white sm:max-w-[60.5rem] sm:text-7xl md:mx-auto md:px-4 md:py-2 md:text-center md:text-7xl lg:text-7xl"
    words={"From Confusion to Cure\nwith AI"}
  />
                  {/* <span className="text-zinc-90 absolute -top-3.5 left-0 z-10 rotate-3 whitespace-nowrap rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white md:top-12 md:-rotate-12">
        Open-source
      </span> */}
                </div>
                <div className="max-w-[40rem]">
                  <FadeText
                    direction="up"
                    text="Translate complex medical data, detect critical conditions, and guide patients to the right care with Intellicure’s end-to-end AI-driven system."
                    className="text-balance text-lg tracking-tight text-zinc-300 md:text-xl"
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
            Discover the features that make IntelliCure the best choice for
            managing your healthcare routine.
          </span>
        </p>
        <FeaturesSection />
      </section>

      <section id="mission" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              {t.mission.title}
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
              {t.mission.subtitle}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              {t.mission.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {t.mission.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg bg-muted">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Your health data is protected with enterprise-grade security and
                privacy measures.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white dark:bg-zinc-800">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Patient-Centered
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Designed with patients in mind, making healthcare more
                accessible and understandable.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white dark:bg-zinc-800">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Clinically Validated
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Our AI models are trained and validated by medical professionals
                and clinical data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-emerald-500 py-32">
        <WordPullUp
          className="text-6xl font-bold text-white md:text-7xl"
          words="Accurate. Fast. Reliable."
          delayMultiple={1.0}
        />
        <p className="mt-6 max-w-md text-center text-white/90 text-xl">
          AI-powered healthcare diagnostics you can trust
        </p>
      </section>

      <footer id="contact" className="bg-zinc-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <HeartHandshakeIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">IntelliCure</span>
              </div>
              <p className="text-zinc-400 mb-6 max-w-md">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.links.product}</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.footer.links.company}</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-400">
            <p>
              &copy; 2024 IntelliCure. All rights reserved. From Cure to Care
              with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
