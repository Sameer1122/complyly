import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
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
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Terms of Use</h1>
          <p className="text-[#6B7280] mb-12">Last updated: February 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">1. Acceptance of Terms</h2>
              <p className="text-[#374151] leading-relaxed">
                By accessing or using Complyly, you agree to be bound by these Terms of Use. If you do not agree, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">2. Description of Service</h2>
              <p className="text-[#374151] leading-relaxed">
                Complyly offers automated document explanation services. The platform analyses uploaded documents and generates
                plain-language summaries. The Service does not provide legal, financial, tax, or professional advice of any kind.
                Explanations are generated automatically and may contain errors or omissions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">3. User Responsibilities</h2>
              <ul className="space-y-2 text-[#374151] list-disc list-inside">
                <li>Provide accurate information</li>
                <li>Use the service lawfully</li>
                <li>Avoid uploading illegal content</li>
                <li>Refrain from reverse engineering</li>
                <li>Do not upload sensitive identity documents</li>
                <li>Accept full responsibility for decisions based on outputs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">4. No Professional Advice</h2>
              <p className="text-[#374151] leading-relaxed">
                The service does not constitute legal, financial, tax, or professional consulting.
                We recommend you consult qualified professionals for advice specific to your situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">5. Payment and Refunds</h2>
              <p className="text-[#374151] leading-relaxed">
                Payment is processed through Stripe. Refunds are available within 7 days for technical failures
                or loading issues. Contact support@complyly.io for refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">6. Intellectual Property</h2>
              <p className="text-[#374151] leading-relaxed">
                Complyly owns the service. You retain ownership of your documents but grant us a limited licence
                to process them for the purpose of providing the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">7. Limitation of Liability</h2>
              <p className="text-[#374151] leading-relaxed">
                The service is provided &ldquo;as is&rdquo; with no accuracy guarantees.
                Our liability is capped at the amount you paid for the report.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">8. Indemnification</h2>
              <p className="text-[#374151] leading-relaxed">
                You agree to indemnify Complyly against claims arising from your use of the service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">9. Modifications to Service</h2>
              <p className="text-[#374151] leading-relaxed">
                Complyly reserves the right to modify or discontinue the service. Continued use implies acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">10. Termination</h2>
              <p className="text-[#374151] leading-relaxed">
                Complyly may immediately suspend access for violation of these terms or harmful conduct.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">11. Governing Law</h2>
              <p className="text-[#374151] leading-relaxed">
                These terms are governed by the laws of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">12. Contact Information</h2>
              <p className="text-[#374151] leading-relaxed">
                For enquiries about these terms, contact us at legal@complyly.io.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
