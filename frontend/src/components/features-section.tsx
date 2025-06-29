import { cn } from "@/lib/utils";
import {
  BookOpenTextIcon,
  BrainIcon,
  ClipboardListIcon,
  ImageIcon,
  RouteIcon,
  StethoscopeIcon,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Medical Jargon Translator",
      description:
        "Translates complex medical terms into simple language from prescriptions, clinical documents, or lab reports using NLP to improve health literacy.",
      icon: <BookOpenTextIcon />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      accent: "from-blue-500 to-blue-400",
    },
    {
      title: "AI-Based Disease Predictor",
      description:
        "Analyzes health data to predict potential conditions, providing early insights and actionable recommendations.",
      icon: <BrainIcon />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      accent: "from-purple-500 to-fuchsia-400",
    },
    {
      title: "AI Imaging Diagnostics",
      description:
        "Advanced deep learning models analyze medical images for pneumonia, brain tumors, and Alzheimer's detection with high accuracy.",
      icon: <ImageIcon />,
      color: "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400 border-teal-200 dark:border-teal-800",
      accent: "from-teal-500 to-emerald-400",
    },
    {
      title: "Condition-Based Smart Routing",
      description:
        "Automatically directs patients to relevant diagnostic modules and specialists based on their condition for seamless care navigation.",
      icon: <RouteIcon />,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      accent: "from-amber-500 to-yellow-400",
    },
    {
      title: "Doctor Appointment Booking",
      description:
        "Books appointments with the right specialists (neurologists, pulmonologists, etc.) based on diagnostic results.",
      icon: <StethoscopeIcon />,
      color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 border-green-200 dark:border-green-800",
      accent: "from-green-500 to-lime-400",
    },
    {
      title: "Real-Time Results & Reports",
      description:
        "Delivers instant diagnostic results with explainable outputs and visualizations like heatmaps for transparency.",
      icon: <ClipboardListIcon />,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      accent: "from-indigo-500 to-violet-400",
    },
  ];

  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 py-10 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  color,
  accent,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: string;
  accent: string;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col overflow-hidden rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-zinc-900",
        color
      )}
    >
      <div
        className={cn(
          "relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full",
          color
        )}
      >
        {icon}
      </div>
      <div className="relative z-10 mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">
        {title}
      </div>
      <p className="relative z-10 text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 rounded-b-lg bg-gradient-to-r transition-transform duration-300 group-hover/feature:scale-x-100",
          accent
        )}
      />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white opacity-10 transition-all duration-500 group-hover/feature:scale-150 group-hover/feature:opacity-20 dark:bg-black" />
    </div>
  );
};