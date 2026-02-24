"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import type { ClauseAnalysis } from "@/lib/report-types";

interface ReportData {
  id: string;
  fileName: string;
  category: string;
  summary: string | null;
  riskScore: number | null;
  clauseAnalysis: ClauseAnalysis[] | null;
  recommendations: string[] | null;
  redFlags: string[] | null;
  actionChecklist: string[] | null;
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

function getClauseRiskColor(level: string) {
  switch (level) {
    case "low":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "high":
      return "bg-red-50 text-red-600 border-red-200";
    case "critical":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-slate-50 text-[#6B7280] border-slate-200";
  }
}

function getClauseBorderColor(level: string) {
  switch (level) {
    case "high": return "border-l-red-400";
    case "critical": return "border-l-red-500";
    case "medium": return "border-l-amber-400";
    default: return "border-l-slate-200";
  }
}

export function ReportClient({ report }: { report: ReportData }) {
  const [downloading, setDownloading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  async function handleDownloadPDF() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/report/${report.id}/pdf`);
      if (!res.ok) {
        toast.error("Failed to download PDF");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `complyly-report-${report.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  }

  function toggleChecked(index: number) {
    const next = new Set(checkedItems);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCheckedItems(next);
  }

  const clauses = report.clauseAnalysis ?? [];
  const recommendations = report.recommendations ?? [];
  const redFlags = report.redFlags ?? [];
  const checklist = report.actionChecklist ?? [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 sm:py-10 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Unlocked
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            {report.fileName}
          </h1>
          <p className="text-[#6B7280] mt-1.5">
            {report.category} —{" "}
            {new Date(report.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="h-10 px-4 rounded-[10px] border border-slate-200 text-[#374151] font-medium hover:bg-slate-50 transition-all text-sm inline-flex items-center"
          >
            &larr; Dashboard
          </Link>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="h-10 px-4 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-50 transition-all flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {downloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
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
              <p className={`text-4xl font-bold tabular-nums ${getRiskColor(report.riskScore)}`}>
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

      {/* Red Flags */}
      {redFlags.length > 0 && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Red Flags ({redFlags.length})
          </h2>
          <ul className="space-y-3">
            {redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 text-[#374151] bg-white/60 rounded-xl p-3 border border-red-100">
                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs font-bold">!</span>
                </span>
                <span className="text-sm leading-relaxed">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clause Analysis */}
      {clauses.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Clause Analysis ({clauses.length})
          </h2>
          <div className="space-y-4 stagger-children">
            {clauses.map((clause, i) => (
              <div
                key={i}
                className={`border border-slate-200 rounded-xl p-5 border-l-4 ${getClauseBorderColor(clause.riskLevel)}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-[#6B7280] font-mono">
                      {clause.clauseNumber}
                    </span>
                    <h3 className="font-semibold text-[#111827] mt-0.5">
                      {clause.title}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap border ${getClauseRiskColor(clause.riskLevel)}`}
                  >
                    {clause.riskLevel.toUpperCase()}
                  </span>
                </div>
                {clause.originalText && (
                  <p className="text-sm text-[#6B7280] italic mb-3 border-l-2 border-slate-200 pl-3 py-1">
                    &ldquo;
                    {clause.originalText.length > 300
                      ? clause.originalText.slice(0, 300) + "..."
                      : clause.originalText}
                    &rdquo;
                  </p>
                )}
                <p className="text-[#374151] text-sm leading-relaxed">
                  {clause.explanation}
                </p>
                {clause.concern && (
                  <div className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100 flex items-start gap-2">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                    <span><strong>Concern:</strong> {clause.concern}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Recommendations ({recommendations.length})
          </h2>
          <ul className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-[#374151]">
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#2563EB] text-xs font-bold">{i + 1}</span>
                </span>
                <span className="text-sm leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Checklist */}
      {checklist.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-1 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Action Checklist
          </h2>
          <p className="text-xs text-[#6B7280] mb-4">
            {checkedItems.size} of {checklist.length} completed
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
              style={{ width: `${checklist.length > 0 ? (checkedItems.size / checklist.length) * 100 : 0}%` }}
            />
          </div>
          <ul className="space-y-2">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <button
                  onClick={() => toggleChecked(i)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    checkedItems.has(i)
                      ? "bg-[#2563EB] border-[#2563EB] scale-105"
                      : "border-slate-300 hover:border-[#2563EB]"
                  }`}
                >
                  {checkedItems.has(i) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    checkedItems.has(i)
                      ? "line-through text-[#6B7280]"
                      : "text-[#374151]"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
