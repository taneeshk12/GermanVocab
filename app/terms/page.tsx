import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";

export const metadata = {
  title: "Terms of Service | German Vocab",
  description: "LangFlow Terms of Service - User agreement and guidelines",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Terms of Service"
        description="Last updated: February 9, 2026"
      />

      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using LangFlow, you accept and agree to be bound by the terms and provision of this 
              agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Permission is granted to temporarily access and use LangFlow for personal, non-commercial learning purposes. 
              This license shall automatically terminate if you violate any of these restrictions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on LangFlow</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Maintaining the confidentiality of your account and password</li>
              <li>Restricting access to your computer and account</li>
              <li>All activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. User Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain all rights to any content you submit, post, or display on or through LangFlow. By submitting 
              content, you grant us a license to use, modify, publicly perform, publicly display, reproduce, and 
              distribute such content for the purpose of operating and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Prohibited Uses</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You agree not to use LangFlow:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The service and its original content, features, and functionality are and will remain the exclusive 
              property of LangFlow. The service is protected by copyright, trademark, and other laws. Our trademarks 
              may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on LangFlow are provided on an &apos;as is&apos; basis. LangFlow makes no warranties, 
              expressed or implied, and hereby disclaims all warranties including, without limitation, implied 
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall LangFlow or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use LangFlow, even if we have been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
              whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use 
              the service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed and construed in accordance with applicable laws, without regard to its 
              conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
              try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a 
              material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@langflow.com" className="text-primary hover:underline">
                support@langflow.com
              </a>
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
