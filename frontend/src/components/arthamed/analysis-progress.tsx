"use client";

import { FileText, Brain, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AnalysisProgressProps {
  progress: number;
  stage: string;
  fileCount: number;
}

export function AnalysisProgress({
  progress,
  stage,
  fileCount,
}: AnalysisProgressProps) {
  const getStageIcon = () => {
    if (progress < 25)
      return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    if (progress < 75)
      return (
        <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
      );
    if (progress < 100)
      return (
        <Loader2 className="w-5 h-5 text-orange-600 dark:text-orange-400 animate-spin" />
      );
    return (
      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
    );
  };

  const getProgressColor = () => {
    if (progress < 25) return "bg-blue-600 dark:bg-blue-500";
    if (progress < 50) return "bg-purple-600 dark:bg-purple-500";
    if (progress < 75) return "bg-orange-600 dark:bg-orange-500";
    return "bg-green-600 dark:bg-green-500";
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center space-x-2 dark:text-white">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>AI Analysis in Progress</span>
        </CardTitle>
        <div className="flex justify-center">
          <Badge
            variant="secondary"
            className="text-xs dark:bg-gray-700 dark:text-gray-200"
          >
            Processing {fileCount} document{fileCount > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Circle */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <svg
              className="w-24 h-24 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="text-blue-600 dark:text-blue-400 transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Current Stage */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            {getStageIcon()}
            <span className="font-medium text-gray-900 dark:text-white">
              Current Stage
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2">
            {stage}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="relative">
            <Progress
              value={progress}
              className="h-3 bg-gray-200 dark:bg-gray-700"
            />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Analysis Steps
          </h4>
          <div className="space-y-1 text-xs">
            {[
              { threshold: 10, label: "Document Reading" },
              { threshold: 25, label: "Content Processing" },
              { threshold: 45, label: "Medical Term Analysis" },
              { threshold: 65, label: "Clinical Data Review" },
              { threshold: 85, label: "Generating Explanations" },
              { threshold: 100, label: "Finalizing Results" },
            ].map((step) => (
              <div
                key={step.label}
                className={`flex items-center space-x-2 ${
                  progress >= step.threshold
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    progress >= step.threshold
                      ? "bg-green-600 dark:bg-green-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
                <span>{step.label}</span>
                {progress >= step.threshold && (
                  <CheckCircle2 className="w-3 h-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Time */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {progress < 100 ? (
              <>
                Estimated time remaining: {Math.ceil((100 - progress) / 20)}{" "}
                minutes
              </>
            ) : (
              <>Analysis completed successfully!</>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
