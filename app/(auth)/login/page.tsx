"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to send code");
        return;
      }
      toast.success("Login code sent to your email");
      setStep("otp");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(fullCode?: string) {
    const codeStr = fullCode || code.join("");
    if (codeStr.length !== 6) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: codeStr }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Verification failed");
        return;
      }
      toast.success("Signed in successfully");
      router.push("/dashboard");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCodeChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        handleVerify(fullCode);
      }
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    }
  }

  return (
    <div className="min-h-svh flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#E5EAF1]">
        <div className="max-w-[1180px] mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.webp" alt="Complyly" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-[#111827] text-lg">Complyly</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8" style={{ background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)" }}>
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo & title */}
          <div className="flex flex-col items-center mb-8">
            <Image src="/logo.webp" alt="Complyly" width={48} height={48} className="rounded-xl mb-5" />
            <h1 className="text-2xl font-bold text-[#111827]">
              {step === "email" ? "Welcome back" : "Enter your code"}
            </h1>
            <p className="text-[#6B7280] mt-1.5 text-center">
              {step === "email"
                ? "Sign in to your Complyly account"
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {step === "email" ? (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#111827] mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full h-12 rounded-[14px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "Sending..." : "Send login code"}
                </button>
                <p className="text-xs text-[#6B7280] text-center pt-1">
                  No password required. We&apos;ll send a one-time code to your
                  email.
                </p>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-3 text-center">
                    Enter your 6-digit code
                  </label>
                  <div
                    className="flex justify-center gap-2.5"
                    onPaste={handleCodePaste}
                  >
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        autoFocus={i === 0}
                        className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-[#2563EB] transition-all"
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleVerify()}
                  disabled={loading || code.join("").length !== 6}
                  className="w-full h-12 rounded-[14px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "Verifying..." : "Verify & sign in"}
                </button>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      setStep("email");
                      setCode(["", "", "", "", "", ""]);
                    }}
                    className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    &larr; Use different email
                  </button>
                  <button
                    onClick={(e) => {
                      setCode(["", "", "", "", "", ""]);
                      handleSendCode(e as unknown as React.FormEvent);
                    }}
                    disabled={loading}
                    className="text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
