import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { InfoBanner } from "@/components/info-banner";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-svh flex flex-col bg-white">
      {/* Info Banner */}
      <InfoBanner />

      {/* Header */}
      <header className="bg-white border-b border-[#E5EAF1] sticky top-0 z-40">
        <nav className="max-w-[1180px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.webp" alt="Complyly" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-semibold text-[#111827]">Complyly</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/contact"
                className="text-[#6B7280] hover:text-[#111827] text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          className="min-h-[600px] pt-20 pb-16"
          style={{ background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)" }}
        >
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-[42px] md:text-[52px] font-bold text-[#111827] leading-[1.1] mb-6">
                Understand the agreement before you sign — or rely on it.
              </h1>
              <p className="text-lg text-[#374151] mb-8 leading-relaxed font-medium">
                Complyly explains your document in plain English and highlights how it affects
                your position — whether the agreement is new or already in place.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-14 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-base font-medium transition-colors"
              >
                Start free preview
              </Link>
              <p className="text-sm text-[#7A8699] mt-4">
                No account required &bull; Preview available in minutes
              </p>
            </div>
          </div>
        </section>

        {/* Common Agreements */}
        <section className="py-20 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#111827] mb-4">
                Common agreements people check
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <Link
                href="/login"
                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Tenancy agreements</h3>
              </Link>
              <Link
                href="/login"
                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Employment contracts</h3>
              </Link>
              <Link
                href="/login"
                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Loan or finance terms</h3>
              </Link>
              <Link
                href="/login"
                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Subscription and service policies</h3>
              </Link>
              <Link
                href="/login"
                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Business agreements</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#111827] mb-4">How it works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">1</div>
                <h3 className="text-lg font-bold text-[#111827] mb-1">Upload the document</h3>
                <p className="text-[#5F6B7A] text-sm">PDF, Word, or image format</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">2</div>
                <h3 className="text-lg font-bold text-[#111827] mb-1">See key insights immediately</h3>
                <p className="text-[#5F6B7A] text-sm">Free preview shows your position</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">3</div>
                <h3 className="text-lg font-bold text-[#111827] mb-1">Unlock full explanation</h3>
                <p className="text-[#5F6B7A] text-sm">Get detailed analysis and suggested next steps</p>
              </div>
            </div>

            {/* Document transformation visual */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden mb-4 shadow-md">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-white opacity-80" />
                      <div className="relative w-4/5 space-y-2 px-4">
                        <div className="h-2 bg-slate-400 rounded opacity-40 blur-sm" />
                        <div className="h-2 bg-slate-400 rounded w-3/4 opacity-40 blur-sm" />
                        <div className="h-2 bg-slate-400 rounded opacity-40 blur-sm" />
                        <div className="h-2 bg-slate-400 rounded w-5/6 opacity-40 blur-sm" />
                        <div className="mt-4 h-16 bg-gradient-to-b from-amber-200 to-amber-100 rounded opacity-30 blur-sm" />
                        <div className="h-2 bg-slate-400 rounded opacity-40 blur-sm" />
                        <div className="h-2 bg-slate-400 rounded w-4/5 opacity-40 blur-sm" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 text-center">Confusing language</h3>
                  <p className="text-xs text-slate-600 text-center mt-1">Official wording &amp; technical terms</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="hidden md:flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <svg className="w-6 h-6 text-slate-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square bg-gradient-to-br from-white to-blue-50 rounded-xl overflow-hidden mb-4 shadow-md border-2 border-blue-200">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="relative w-4/5 space-y-3 px-4">
                        <div className="h-3 bg-blue-600 rounded w-2/3" />
                        <div className="mt-4 space-y-2">
                          <div className="h-2 bg-slate-800" />
                          <div className="h-2 bg-slate-800 w-5/6" />
                        </div>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-2 rounded mt-4">
                          <p className="text-xs font-semibold text-amber-900">Key point:</p>
                          <p className="text-xs text-amber-700">Plain language explanation</p>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded mt-2">
                          <p className="text-xs font-semibold text-red-900">&#9888; Risk:</p>
                          <p className="text-xs text-red-700">What to watch for</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 text-center">Clear explanation</h3>
                  <p className="text-xs text-slate-600 text-center mt-1">Plain language &amp; insights</p>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center text-[#111827] mb-8">Your report at a glance</h3>
              <div className="flex justify-center items-center">
                <div className="relative w-72 h-96 bg-black rounded-3xl shadow-2xl p-2 overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl z-10" />
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-6 pt-8">
                      <h4 className="text-lg font-bold">Rental Agreement</h4>
                      <p className="text-xs text-blue-100">Document analysis complete</p>
                    </div>
                    <div className="flex-1 px-4 py-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                              <p className="text-xs font-semibold text-amber-900">Financial obligations detected</p>
                              <p className="text-xs text-amber-700">Monthly payment conditions apply</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Key dates</p>
                          <p className="text-xs text-blue-700">Lease starts: March 15, 2026</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3">
                      <div className="w-full py-2 bg-white text-blue-600 font-semibold rounded-lg text-sm text-center">
                        View full report
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-24 w-1 h-12 bg-slate-800 rounded-l" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New agreement or existing? */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#111827] mb-4">New agreement or existing?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827]">Before signing</h3>
                </div>
                <ul className="space-y-4">
                  {["Identify clauses that warrant clarification", "Highlight areas that may carry risk", "Prepare questions to raise before agreeing"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827]">Already signed</h3>
                </div>
                <ul className="space-y-4">
                  {["Review your current position", "Highlight areas of concern", "Consider practical next steps"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* More than a summary */}
        <section className="py-20 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#111827] mb-6">More than a summary</h2>
              <p className="text-lg text-[#374151] leading-relaxed">
                Most tools shorten documents. Complyly helps you understand what the agreement
                sets out, where concerns may arise, and what you may wish to do next.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full mb-4">Free</span>
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">Free preview</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Initial insight", "Overall position indication"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#374151]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">Recommended</span>
                </div>
                <div className="mb-6 pt-2">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#111827]">£4.99</span>
                    <span className="text-sm text-[#6B7280]">one-time</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111827]">Full report</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Detailed explanation", "Then and now comparison", "Areas of concern highlighted", "Suggested message wording", "Downloadable record"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#374151]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full flex items-center justify-center h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors">
                  Unlock full report
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Designed for clarity */}
        <section className="py-20 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#111827] mb-4">Designed for clarity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">Plain English explanations</h3>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">Delete your analysis anytime</h3>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">Your document is not shared</h3>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">Informational guidance — not legal advice</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-[1180px] mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">Clarity supports better decisions.</h2>
            <p className="text-base text-[#6B7280] mb-8">Start with a free preview — no account required.</p>
            <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-base font-medium transition-colors">
              Start free preview
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
