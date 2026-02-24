"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Disclaimer top */}
        <div className="text-center mb-8 pb-8 border-b border-slate-700">
          <p className="text-slate-200 mb-2 font-medium">
            Complyly provides automated explanations to help you understand document wording.
          </p>
          <p className="text-slate-400 text-sm">
            It is not legal advice and does not replace a qualified professional.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-white mb-3">Understanding the Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  How Complyly works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Sample explanations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Document types
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  How explanations work
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Your Data &amp; Use</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Data processing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Platform safeguards
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Automated explanations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors">
                  Report a technical issue
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Complyly
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  When people use this
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Articles &amp; updates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Italic disclaimer */}
        <div className="text-center">
          <p className="text-xs text-slate-500 italic">
            Explanations are generated automatically from document text and may not reflect legal interpretation in all jurisdictions.
          </p>
        </div>

        {/* Bottom */}
        <div className="text-center mt-8 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-3 italic">
            Complyly — clarity before action.
          </p>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Complyly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
