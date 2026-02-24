"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="bg-white border-b border-[#E5EAF1] sticky top-0 z-40">
      <div className="max-w-[1180px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image src="/logo.webp" alt="Complyly" width={32} height={32} className="rounded-lg" />
          <span className="font-bold text-[#111827] text-lg">Complyly</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/dashboard"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              isActive("/dashboard")
                ? "text-[#2563EB] bg-blue-50 font-medium"
                : "text-[#5F6B7A] hover:text-[#111827] hover:bg-slate-50"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/upload"
            className={`text-sm px-4 py-1.5 rounded-[10px] transition-colors flex items-center gap-1.5 ${
              isActive("/upload")
                ? "bg-[#1D4ED8] text-white font-medium"
                : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Upload
          </Link>
          <button
            type="button"
            disabled={signingOut}
            onClick={async () => {
              setSigningOut(true);
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="text-sm text-[#5F6B7A] hover:text-[#111827] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 ml-1"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </nav>
      </div>
    </header>
  );
}
