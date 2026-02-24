import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Privacy Policy</h1>
          <p className="text-[#6B7280] mb-12">Last updated: February 2026</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">1. Introduction</h2>
              <p className="text-[#374151] leading-relaxed">
                At Complyly, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, and safeguard your information when you use our document analysis service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">2. Information We Collect</h2>
              <ul className="space-y-3 text-[#374151]">
                <li className="leading-relaxed"><strong>Documents:</strong> When you upload a document, we temporarily process its contents to generate your explanation report.</li>
                <li className="leading-relaxed"><strong>Payment Information:</strong> Payment is processed through Stripe. We do not store your full card details.</li>
                <li className="leading-relaxed"><strong>Usage Data:</strong> We collect basic analytics to improve the service.</li>
                <li className="leading-relaxed"><strong>Device Information:</strong> We collect device and browser data for security and compatibility purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-[#374151] list-disc list-inside">
                <li>Generate document explanations</li>
                <li>Process payments</li>
                <li>Improve our service</li>
                <li>Communicate with you about the service</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">4. Document Processing &amp; Storage</h2>
              <ul className="space-y-2 text-[#374151] list-disc list-inside">
                <li>Documents are processed securely using encryption</li>
                <li>Uploaded documents are automatically deleted within 24 hours</li>
                <li>We do not use your documents to train machine learning models</li>
                <li>Documents are not shared with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">5. Data Security</h2>
              <p className="text-[#374151] leading-relaxed">
                We implement appropriate technical and organisational measures to protect your data,
                including encryption and regular security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">6. Third-Party Services</h2>
              <p className="text-[#374151] leading-relaxed">
                We use Stripe for payment processing, Vercel for hosting, and analytics providers.
                Each service has its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">7. Your Rights</h2>
              <p className="text-[#374151] leading-relaxed mb-2">You may have the right to:</p>
              <ul className="space-y-2 text-[#374151] list-disc list-inside">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Data portability</li>
              </ul>
              <p className="text-[#374151] leading-relaxed mt-3">
                Contact us at privacy@complyly.io to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">8. Cookies</h2>
              <p className="text-[#374151] leading-relaxed">
                We use essential cookies only. We do not use advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">9. Children&apos;s Privacy</h2>
              <p className="text-[#374151] leading-relaxed">
                Our service is not intended for users under the age of 18. We do not knowingly collect data from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">10. Changes to This Policy</h2>
              <p className="text-[#374151] leading-relaxed">
                We may update this policy from time to time. Changes will be posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-3">11. Contact Us</h2>
              <p className="text-[#374151] leading-relaxed">
                For privacy-related questions, contact us at privacy@complyly.io.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
