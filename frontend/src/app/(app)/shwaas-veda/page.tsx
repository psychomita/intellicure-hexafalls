/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Brain,
  CheckCircle,
  FileImage,
  Upload,
} from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";

interface UploadState {
  file: File | null;
  progress: number;
  status: "idle" | "uploading" | "completed" | "error";
  error?: string;
}

interface AnalysisResult {
  prediction: string;
  confidence: number;
  gemini_analysis: string;
  error?: string;
}

export default function ShwaasVedaApp() {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    progress: 0,
    status: "idle",
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadState({
        file: null,
        progress: 0,
        status: "error",
        error: "Please select a valid image file (JPEG, PNG, DICOM, etc.)",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadState({
        file: null,
        progress: 0,
        status: "error",
        error: "File size must be less than 50MB",
      });
      return;
    }

    setUploadState({
      file,
      progress: 0,
      status: "idle",
      error: undefined,
    });
    setAnalysisResult(null);
  }, []);

  const fetchAnalysisResult = useCallback(async (file: File) => {
    setIsLoadingResult(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pneumonia/predict`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: unknown) {
      setAnalysisResult({
        prediction: "",
        confidence: 0,
        gemini_analysis: "",
        error: "Failed to analyze image. Please try again.",
      });
    } finally {
      setIsLoadingResult(false);
    }
  }, []);

  const simulateUpload = useCallback(() => {
    if (!uploadState.file) return;

    setUploadState((prev) => ({ ...prev, status: "uploading", progress: 0 }));
    setAnalysisResult(null);

    const interval = setInterval(() => {
      setUploadState((prev) => {
        const newProgress = prev.progress + Math.random() * 15;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadState((prev) => ({
              ...prev,
              progress: 100,
              status: "completed",
            }));
            fetchAnalysisResult(uploadState.file!);
          }, 500);
          return { ...prev, progress: 100 };
        }

        return { ...prev, progress: newProgress };
      });
    }, 200);
  }, [uploadState.file, fetchAnalysisResult]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) handleFileSelect(files[0]);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const resetUpload = () => {
    setUploadState({
      file: null,
      progress: 0,
      status: "idle",
    });
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Shwaas Veda - Chest X-ray Pneumonia Detector
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Upload your chest X-ray image to get an AI-powered prediction and
              simplified report.
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-slate-800">
                Chext X-Ray Image Upload
              </CardTitle>
              <CardDescription className="text-slate-600">
                Supported formats: JPEG, PNG Max size: 10MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`
                           relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                           ${
                             isDragOver
                               ? "border-emerald-400 bg-emerald-50"
                               : uploadState.status === "error"
                               ? "border-red-300 bg-red-50"
                               : "border-slate-300 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50"
                           }
                         `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadState.status === "uploading"}
                />

                <div className="space-y-4">
                  {uploadState.file ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileImage className="w-8 h-8 text-emerald-600" />
                      <div className="text-left">
                        <p className="font-medium text-slate-900">
                          {uploadState.file.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {(uploadState.file.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-slate-700 mb-2">
                          Drop your Chext X-Ray image here
                        </p>
                        <p className="text-slate-500">
                          or click to browse files
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {uploadState.status === "error" && uploadState.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {uploadState.error}
                  </AlertDescription>
                </Alert>
              )}

              {uploadState.file && uploadState.status !== "error" && (
                <div className="space-y-4">
                  {uploadState.status === "uploading" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Uploading...</span>
                        <span className="text-slate-600">
                          {Math.round(uploadState.progress)}%
                        </span>
                      </div>
                      <Progress value={uploadState.progress} className="h-2" />
                    </div>
                  )}

                  {uploadState.status === "completed" && (
                    <Alert className="border-emerald-200 bg-emerald-50">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <AlertDescription className="text-emerald-700">
                        Upload completed! The AI is analyzing your image...
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-3 pt-2">
                    {uploadState.status === "idle" && (
                      <Button
                        onClick={simulateUpload}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Start Analysis
                      </Button>
                    )}
                    {uploadState.status === "completed" && (
                      <Button
                        onClick={resetUpload}
                        variant="outline"
                        className="flex-1"
                      >
                        Upload Another Image
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {uploadState.status === "completed" && (
            <Card className="shadow-md mt-6 border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  Analysis Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingResult ? (
                  <p className="text-slate-600 animate-pulse">
                    Analyzing image, please wait...
                  </p>
                ) : analysisResult?.error ? (
                  <p className="text-red-600">{analysisResult.error}</p>
                ) : analysisResult ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-emerald-700">
                        Diagnosis
                      </h3>
                      <p className="text-slate-700">
                        <span className="font-medium">Prediction:</span>{" "}
                        {analysisResult.prediction}
                      </p>
                      <p className="text-slate-600">
                        <span className="font-medium">Confidence:</span>{" "}
                        {(analysisResult.confidence * 100).toFixed(2)}%
                      </p>
                    </div>

                    <details className="bg-white border border-slate-200 rounded-lg p-4">
                      <summary className="cursor-pointer text-slate-800 font-semibold text-base">
                        View Full Medical Report
                      </summary>
                      <pre className="whitespace-pre-wrap text-sm mt-4 text-slate-700">
                        {analysisResult.gemini_analysis}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <p className="text-slate-500">No result available yet.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
