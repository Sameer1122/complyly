"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Extracting text", description: "Reading your document" },
  { label: "Analysing clauses", description: "Reviewing against UK law" },
  { label: "Generating report", description: "Compiling your results" },
];

export default function ProcessingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [status, setStatus] = useState("PROCESSING");
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (error) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(timer);
  }, [error]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/report/${id}`);
        if (!res.ok) {
          setError("Failed to check report status");
          clearInterval(interval);
          return;
        }
        const data = await res.json();
        setStatus(data.status);

        if (data.status === "PREVIEW_READY" || data.status === "PAYMENT_PENDING") {
          clearInterval(interval);
          router.push(`/preview/${id}`);
        } else if (data.status === "UNLOCKED" || data.status === "PDF_READY") {
          clearInterval(interval);
          router.push(`/report/${id}`);
        } else if (data.status === "UPLOADED") {
          clearInterval(interval);
          setError(
            "Analysis failed. Please try uploading again."
          );
        }
      } catch {
        // Silently retry on network issues
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id, router]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="relative z-10 animate-fade-in-up">
          {error ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-2">
                Analysis Failed
              </h2>
              <p className="text-[#6B7280] mb-6">{error}</p>
              <button
                onClick={() => router.push("/upload")}
                className="h-12 px-6 rounded-[14px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="text-center">
              {/* Spinner */}
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2563EB] animate-spin" />
                <div className="absolute inset-2.5 rounded-full border-4 border-transparent border-b-blue-300 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
              </div>

              <h2 className="text-2xl font-bold text-[#111827] mb-2">
                Analysing your document
              </h2>
              <p className="text-[#2563EB] font-medium text-sm mb-8">
                Complyly — Understand Where You Stand
              </p>

              {/* Progress steps */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 text-left mb-6">
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        i < activeStep
                          ? "bg-emerald-50 text-emerald-600"
                          : i === activeStep
                            ? "bg-blue-50 text-[#2563EB]"
                            : "bg-slate-50 text-[#6B7280]"
                      }`}>
                        {i < activeStep ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : i === activeStep ? (
                          <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse-soft" />
                        ) : (
                          <span className="text-xs font-medium">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium transition-colors ${
                          i <= activeStep ? "text-[#111827]" : "text-[#6B7280]"
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-[#6B7280]">{step.description}</p>
                      </div>
                      {i === activeStep && (
                        <div className="flex gap-1">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce"
                              style={{ animationDelay: `${d * 0.15}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#6B7280]">
                {status === "PROCESSING"
                  ? "This usually takes 30–60 seconds..."
                  : "Almost there..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
