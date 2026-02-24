import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold text-[#111827] mb-12">About Complyly</h1>

          <div className="space-y-12">
            {/* Understanding the Service */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Understanding the Service</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">How Complyly works</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Complyly provides automated explanations of documents using pattern-based analysis and language processing.
                    The system identifies structures and patterns to generate summaries. It does not determine legality or enforceability.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Sample explanations</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Examples shown on this website are demonstrations only and do not represent advice for specific situations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Document types you can check</h3>
                  <p className="text-[#374151] leading-relaxed">
                    The service reviews notices, letters, agreements, and administrative documents.
                    It does not verify authenticity or jurisdictional validity.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">How the system generates explanations</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Outputs are pattern-based and may not cover every interpretation.
                    The system does not replace human review.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Data & Use */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Your Data &amp; Use</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Privacy Policy</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Documents are processed securely and not sold to third parties.
                    See our full <Link href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</Link> for details.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Terms of Use</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Complyly is not a legal, financial, or professional advisory service.
                    See our full <Link href="/terms" className="text-[#2563EB] hover:underline">Terms of Use</Link> for details.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">How your data is processed</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Files are temporarily processed and not retained longer than necessary.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Platform safeguards</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Technical measures protect your data, though no absolute security guarantee exists.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">About automated explanations</h3>
                  <p className="text-[#374151] leading-relaxed">
                    Outputs are unreviewed and may contain inaccuracies.
                    Always verify important information with a qualified professional.
                  </p>
                </div>
              </div>
            </section>

            {/* Help */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Help</h2>
              <p className="text-[#374151] leading-relaxed">
                For general questions or technical issues, contact us at{" "}
                <a href="mailto:support@complyly.io" className="text-[#2563EB] hover:underline">support@complyly.io</a>{" "}
                or visit our <Link href="/support" className="text-[#2563EB] hover:underline">Support</Link> page.
              </p>
            </section>

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">About</h2>
              <p className="text-[#374151] leading-relaxed mb-4">
                Complyly was created to help people understand documents that affect their everyday lives.
                Whether it&apos;s a tenancy agreement, employment contract, or loan terms, our goal is to
                provide clear, accessible explanations so you can make informed decisions.
              </p>
              <p className="text-[#374151] leading-relaxed">
                We believe everyone should be able to understand what they&apos;re signing up to — or already bound by.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
