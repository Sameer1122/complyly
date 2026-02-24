"use client";

import { useState } from "react";
import { toast } from "sonner";

interface PreviewReport {
  id: string;
  fileName: string;
  category: string;
  summary: string | null;
  riskScore: number | null;
  status: string;
  createdAt: string;
}

function getRiskColor(score: number) {
  if (score <= 25) return "text-emerald-600";
  if (score <= 50) return "text-amber-600";
  return "text-red-600";
}

function getRiskBg(score: number) {
  if (score <= 25) return "bg-emerald-50";
  if (score <= 50) return "bg-amber-50";
  return "bg-red-50";
}

function getRiskLabel(score: number) {
  if (score <= 25) return "Low Risk";
  if (score <= 50) return "Moderate Risk";
  if (score <= 75) return "High Risk";
  return "Critical Risk";
}

const lockedSections = [
  { title: "Clause Analysis", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", bars: 6 },
  { title: "Recommendations", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", bars: 4 },
  { title: "Red Flags", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", bars: 3 },
  { title: "Action Checklist", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", bars: 5 },
];

export function PreviewClient({ report }: { report: PreviewReport }) {
  const [loading, setLoading] = useState(false);

  async function handleUnlock() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: report.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create checkout session");
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 sm:py-10 animate-fade-in-up">
      {/* Report Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-xs font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">{report.fileName}</h1>
        <p className="text-[#6B7280] mt-1.5">
          {report.category} — {new Date(report.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Risk Score */}
      {report.riskScore !== null && (
        <div
          className={`rounded-2xl p-6 mb-6 border ${
            report.riskScore <= 25 ? "border-emerald-200" :
            report.riskScore <= 50 ? "border-amber-200" :
            "border-red-200"
          } ${getRiskBg(report.riskScore)}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280] mb-1">
                Risk Score
              </p>
              <p className={`text-4xl font-bold ${getRiskColor(report.riskScore)}`}>
                {report.riskScore}
                <span className="text-lg text-[#6B7280] font-normal">/100</span>
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${getRiskColor(report.riskScore)} ${getRiskBg(report.riskScore)} border ${
                report.riskScore <= 25 ? "border-emerald-200" :
                report.riskScore <= 50 ? "border-amber-200" :
                "border-red-200"
              }`}
            >
              {getRiskLabel(report.riskScore)}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {report.summary && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Summary
          </h2>
          <p className="text-[#374151] leading-relaxed whitespace-pre-line">
            {report.summary}
          </p>
        </div>
      )}

      {/* Locked Sections */}
      <div className="space-y-4 mb-8 stagger-children">
        {lockedSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden"
          >
            <h2 className="text-lg font-bold text-[#111827] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
              </svg>
              {section.title}
            </h2>
            {/* Blurred placeholder content */}
            <div className="select-none pointer-events-none blur-[8px]">
              <div className="space-y-3">
                {Array.from({ length: section.bars }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-slate-200 rounded"
                    style={{ width: `${65 + ((i * 17) % 35)}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-20% via-white/70 to-white flex items-end justify-center pb-6">
              <div className="flex items-center gap-2 text-sm text-[#6B7280] font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Unlock to view full {section.title.toLowerCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unlock CTA */}
      <div className="relative rounded-2xl border-2 border-[#2563EB]/20 p-8 sm:p-10 text-center overflow-hidden bg-blue-50/30">
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
            Unlock Your Full Report
          </h3>
          <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
            Get complete clause-by-clause analysis, recommendations, red flags,
            and an actionable checklist for your document.
          </p>
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="h-14 px-8 rounded-[14px] bg-[#2563EB] text-white font-semibold text-lg hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Processing..." : "Unlock Full Report — \u00A34.99"}
          </button>
          <p className="text-xs text-[#6B7280] mt-4 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              One-time payment
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Includes PDF download
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
