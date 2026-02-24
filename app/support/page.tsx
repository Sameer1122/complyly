"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-svh flex flex-col bg-white">
      <header className="bg-white border-b border-[#E5EAF1] sticky top-0 z-40">
        <nav className="max-w-[1180px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.webp" alt="Complyly" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-semibold text-[#111827]">Complyly</span>
            </Link>
            <Link href="/" className="text-[#6B7280] hover:text-[#111827] text-sm font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#111827] mb-3">Support</h1>
          <p className="text-[#6B7280] mb-12">
            If you have a question about using Complyly, we&apos;re here to help.
          </p>

          {/* Support categories */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#111827] mb-2">Using Complyly</h3>
              <p className="text-sm text-[#6B7280]">
                Questions about uploading documents, understanding reports, and service functionality.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#111827] mb-2">Payments and Billing</h3>
              <p className="text-sm text-[#6B7280]">
                Questions regarding receipts, refunds, and subscription administration.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#111827] mb-2">Privacy and Deletion</h3>
              <p className="text-sm text-[#6B7280]">
                Questions about data handling, storage, and removal.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-12">
            <p className="text-sm text-amber-900 font-medium mb-1">Important</p>
            <p className="text-sm text-amber-800">
              Complyly provides informational explanations to help you understand documents.
              It does not provide legal, financial, or professional advice.
              Please consult a qualified professional for advice specific to your situation.
            </p>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Contact us</h2>
            <p className="text-[#6B7280] mb-6 text-sm">
              We typically respond within 24 hours during business days.
            </p>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#111827] mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#111827] mb-2">Subject</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                >
                  <option value="general">General question</option>
                  <option value="technical">Technical issue</option>
                  <option value="billing">Billing / Refund</option>
                  <option value="privacy">Privacy / Data deletion</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#111827] mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-sm font-medium transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
