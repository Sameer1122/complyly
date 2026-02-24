"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

interface Report {
  id: string;
  category: string;
  fileName: string;
  status: string;
  riskScore: number | null;
  isUnlocked: boolean;
  createdAt: string;
}

function getRiskColor(score: number | null) {
  if (score === null) return "text-[#6B7280]";
  if (score <= 25) return "text-emerald-600";
  if (score <= 50) return "text-amber-600";
  return "text-red-600";
}

function getRiskBg(score: number | null) {
  if (score === null) return "bg-slate-100";
  if (score <= 25) return "bg-emerald-50";
  if (score <= 50) return "bg-amber-50";
  return "bg-red-50";
}

function getStatusDisplay(status: string) {
  switch (status) {
    case "UPLOADED":
      return { label: "Uploaded", className: "bg-slate-100 text-[#6B7280]", dot: "bg-[#6B7280]" };
    case "PROCESSING":
      return { label: "Processing", className: "bg-blue-50 text-[#2563EB]", dot: "bg-[#2563EB] animate-pulse" };
    case "PREVIEW_READY":
      return { label: "Preview Ready", className: "bg-amber-50 text-amber-600", dot: "bg-amber-500" };
    case "PAYMENT_PENDING":
      return { label: "Awaiting Payment", className: "bg-amber-50 text-amber-600", dot: "bg-amber-500" };
    case "UNLOCKED":
      return { label: "Unlocked", className: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" };
    case "PDF_READY":
      return { label: "Complete", className: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" };
    default:
      return { label: status, className: "bg-slate-100 text-[#6B7280]", dot: "bg-[#6B7280]" };
  }
}

export function DashboardClient() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/dashboard/reports");
        if (!res.ok) {
          toast.error("Failed to load reports");
          return;
        }
        const data = await res.json();
        setReports(data);
      } catch {
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  function getReportLink(report: Report) {
    if (report.isUnlocked) return `/report/${report.id}`;
    if (report.status === "PROCESSING") return `/processing/${report.id}`;
    if (
      report.status === "PREVIEW_READY" ||
      report.status === "PAYMENT_PENDING"
    )
      return `/preview/${report.id}`;
    return `/processing/${report.id}`;
  }

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-[#6B7280] mt-1">
            Your document analysis reports
          </p>
        </div>
        <Link
          href="/upload"
          className="h-10 px-5 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition-all flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Upload
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 rounded-full border-[3px] border-blue-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#2563EB] animate-spin" />
          </div>
          <p className="text-sm text-[#6B7280]">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#2563EB]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">
            No reports yet
          </h3>
          <p className="text-[#6B7280] mb-6 max-w-sm mx-auto">
            Upload your first document to get an AI-powered analysis.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-[14px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Document
          </Link>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {reports.map((report) => {
            const statusDisplay = getStatusDisplay(report.status);
            return (
              <div
                key={report.id}
                onClick={() => router.push(getReportLink(report))}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* File icon */}
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-50 items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111827] truncate group-hover:text-[#2563EB] transition-colors">
                      {report.fileName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#6B7280]">
                        {report.category}
                      </span>
                      <span className="text-xs text-slate-300">&middot;</span>
                      <span className="text-xs text-[#6B7280]">
                        {new Date(report.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Badges and actions */}
                  <div className="flex items-center gap-2.5">
                    {report.riskScore !== null && (
                      <div
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold tabular-nums ${getRiskColor(report.riskScore)} ${getRiskBg(report.riskScore)}`}
                      >
                        {report.riskScore}/100
                      </div>
                    )}

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${statusDisplay.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDisplay.dot}`} />
                      {statusDisplay.label}
                    </span>

                    {report.isUnlocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `/api/report/${report.id}/pdf`,
                            "_blank"
                          );
                        }}
                        className="p-2 rounded-lg text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
                        title="Download PDF"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    )}

                    <svg
                      className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
