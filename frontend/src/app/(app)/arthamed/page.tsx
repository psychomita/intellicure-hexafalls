"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Upload, Users, Zap } from "lucide-react";

import { FileUpload } from "@/components/arthamed/file-upload";
import { UploadedFiles } from "@/components/arthamed/uploaded-files";
import { AnalysisProgress } from "@/components/arthamed/analysis-progress";
import { analyzeMedicalImage } from "@/lib/gemini";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export default function HomePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    summary: string;
    keyFindings: string[];
  }>({ summary: "", keyFindings: [] });

  const resetAnalysis = () => {
    uploadedFiles.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setUploadedFiles([]);
    setAnalysisProgress(0);
    setAnalysisStage("");
    setAnalysisComplete(false);
    setAnalysisResult({ summary: "", keyFindings: [] });
  };

  const handleFileUpload = useCallback(async (files: File[]) => {
    setIsUploading(true);
    try {
      const newFiles: UploadedFile[] = await Promise.all(
        files.map(async (file) => {
          const preview = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined;

          return {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            preview,
          };
        })
      );
      setUploadedFiles(newFiles);
      toast.success("Files uploaded", {
        description: `${files.length} file(s) ready for analysis.`,
      });
    } catch {
      toast.error("Upload failed", { description: "Please try again." });
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((f) => f.id === fileId);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  const handleStartAnalysis = async () => {
    if (!uploadedFiles.length) {
      toast.error("No files to analyze", {
        description: "Please upload at least one file.",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisProgress(0);
    setAnalysisStage("");

    const toastId = toast.loading("Starting analysis...");
    const file = uploadedFiles[0];

    try {
      setAnalysisStage("Reading file...");
      setAnalysisProgress(20);

      const fileBlob = await fetch(file.preview!).then((r) => r.blob());
      const buffer = await fileBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      setAnalysisStage("Sending to Gemini...");
      setAnalysisProgress(50);

      // ⏳ Wait for Gemini early, but store it, don’t display yet
      const responseText = await analyzeMedicalImage(base64, file.type);

      // Finish progress bar + simulate work
      const steps = [
        { stage: "Parsing results...", progress: 75 },
        { stage: "Summarizing findings...", progress: 90 },
        { stage: "Finalizing output...", progress: 100 },
      ];

      for (const step of steps) {
        setAnalysisStage(step.stage);
        setAnalysisProgress(step.progress);
        await new Promise((res) => setTimeout(res, 600));
      }

      const lines = (responseText ?? "").split("\n").filter(Boolean);
      const summary = lines[0] ?? "";
      const keyFindings = lines.slice(1);

      setAnalysisResult({ summary, keyFindings });
      setAnalysisComplete(true);

      toast.success("Analysis completed", {
        id: toastId,
        description: "Medical data extracted successfully.",
      });
    } catch (err) {
      toast.error("Gemini API failed", {
        id: toastId,
        description: "Please try again later.",
      });
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAnalysisActions = () => {
    if (isAnalyzing) {
      return (
        <AnalysisProgress
          progress={analysisProgress}
          stage={analysisStage}
          fileCount={uploadedFiles.length}
        />
      );
    }

    if (analysisComplete) return null;

    return (
      <Button
        onClick={handleStartAnalysis}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
      >
        Start Analysis
        <Zap className="w-4 h-4 ml-2" />
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-center mb-12 w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ArthaMed – Simplify Medical Documents with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upload prescriptions, lab reports, or clinical notes and get
            human-readable explanations with AI.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              {
                icon: <Shield className="w-4 h-4 text-green-600" />,
                label: "Medical Jargon Simplifier",
              },
              {
                icon: <Zap className="w-4 h-4 text-blue-600" />,
                label: "Instant Analysis",
              },
              {
                icon: <Users className="w-4 h-4 text-purple-600" />,
                label: "Patient-Friendly",
              },
            ].map(({ icon, label }, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border"
              >
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Upload Medical Documents</span>
              </CardTitle>
              <CardDescription>
                Drag and drop files or browse. Accepted formats: PDF, JPG, PNG.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 && (
                <FileUpload
                  onFileUpload={handleFileUpload}
                  isUploading={isUploading}
                  acceptedTypes={{
                    "application/pdf": [".pdf"],
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                  }}
                />
              )}

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <UploadedFiles
                    files={uploadedFiles}
                    onRemoveFile={handleRemoveFile}
                  />
                  <div className="mt-6 flex justify-center">
                    {renderAnalysisActions()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {isAnalyzing && (
          <div className="mt-8 w-full max-w-3xl">
            <AnalysisProgress
              progress={analysisProgress}
              stage={analysisStage}
              fileCount={uploadedFiles.length}
            />
          </div>
        )}

        {analysisComplete && (
          <div className="mt-8 bg-white/80 shadow-lg rounded-xl p-6 w-full max-w-3xl space-y-4">
            <h3 className="text-2xl font-bold text-green-700">
              Analysis Results
            </h3>
            <p className="text-gray-700">{analysisResult.summary}</p>

            {analysisResult.keyFindings.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Key Findings:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {analysisResult.keyFindings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={resetAnalysis} variant="outline" className="mt-6">
              Analyze New Documents
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
