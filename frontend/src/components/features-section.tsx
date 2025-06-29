import { cn } from "@/lib/utils";

import {
  BusIcon,
  CctvIcon,
  ClockIcon,
  LayoutDashboardIcon,
  LeafIcon,
  OctagonAlertIcon,
  RouteIcon,
  TriangleAlertIcon,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Real-Time Traffic Updates",
      description:
        "Stay updated with the latest traffic conditions, accidents, and road closures.",
      icon: <ClockIcon />,
    },
    {
      title: "Route Optimization",
      description:
        "Find the fastest, most efficient routes to your destination with dynamic re-routing.",
      icon: <RouteIcon />,
    },
    {
      title: "Incident Reporting",
      description:
        "Report and view traffic incidents like accidents, hazards, or police presence.",
      icon: <OctagonAlertIcon />,
    },
    {
      title: "Live Camera Feeds",
      description:
        "Access live feeds from traffic cameras to monitor road conditions in real-time.",
      icon: <CctvIcon />,
    },
    {
      title: "Public Transit Integration",
      description:
        "Get schedules and real-time updates for buses, trains, and other public transport.",
      icon: <BusIcon />,
    },
    {
      title: "Environmental Impact Insights",
      description:
        "Analyze the environmental impact of your trips with carbon footprint metrics.",
      icon: <LeafIcon />,
    },
    {
      title: "Emergency Alerts",
      description:
        "Receive critical alerts during emergencies such as severe weather or natural disasters.",
      icon: <TriangleAlertIcon />,
    },
    {
      title: "User-Friendly Dashboard",
      description:
        "Enjoy a clean, intuitive interface for managing your daily commute.",
      icon: <LayoutDashboardIcon />,
    },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
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
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-zinc-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-zinc-800 lg:border-l",
        index < 4 && "dark:border-zinc-800 lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-zinc-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-zinc-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-zinc-600 dark:text-zinc-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-zinc-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-amber-500 dark:bg-zinc-700" />
        <span className="inline-block text-zinc-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-zinc-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
    </div>
  );
};