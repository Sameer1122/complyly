"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-svh flex flex-col bg-white">
      <header className="bg-white border-b border-[#E5EAF1] sticky top-0 z-40">
        <nav className="max-w-[1180px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="text-xl font-semibold text-[#111827]">Complyly</span>
            </Link>
            <Link href="/" className="text-[#6B7280] hover:text-[#111827] text-sm font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#111827] mb-3">Get in Touch</h1>
          <p className="text-[#6B7280] mb-12">
            Have a question about Complyly? We&apos;re here to help.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-[#111827] mb-1 text-sm">Email</h3>
              <p className="text-sm text-[#6B7280]">support@complyly.io</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-[#111827] mb-1 text-sm">Response Time</h3>
              <p className="text-sm text-[#6B7280]">Within 24 hours</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-[#111827] mb-1 text-sm">Availability</h3>
              <p className="text-sm text-[#6B7280]">Mon – Fri, 9am – 6pm</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#111827] mb-2">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#111827] mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-sm font-medium transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-[#6B7280]">
              Complyly provides automated explanations to help you understand document wording.
              It does not constitute legal advice and cannot replace qualified professionals.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
