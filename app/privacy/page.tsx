import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";

export const metadata = {
  title: "Privacy Policy | German Vocab",
  description: "LangFlow Privacy Policy - How we protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Privacy Policy"
        description="Last updated: February 9, 2026"
      />

      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to LangFlow. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect and process the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Account information (email address, username)</li>
              <li>Learning progress and vocabulary statistics</li>
              <li>Quiz scores and practice session data</li>
              <li>Usage data and interaction with our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use your personal information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide and maintain our learning platform</li>
              <li>Track your learning progress and provide personalized recommendations</li>
              <li>Communicate with you about your account and our services</li>
              <li>Improve and optimize our platform based on user behavior</li>
              <li>Ensure the security of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized or unlawful processing, accidental loss, destruction, or damage. Your data is stored 
              securely using industry-standard encryption and security protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your data only 
              in the following circumstances: with your consent, to comply with legal obligations, or to protect our 
              rights and safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under data protection laws, you have rights including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate data</li>
              <li>The right to erase your data</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain 
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is available to users of all ages. If you are a parent or guardian and you are aware that 
              your child has provided us with personal data, please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
