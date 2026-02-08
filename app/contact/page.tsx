import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | German Vocab",
  description: "Get in touch with the LangFlow team",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you"
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <GlassCard className="p-8 text-center">
          <Mail className="mx-auto mb-4 text-primary" size={48} />
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Have questions, feedback, or suggestions? We&apos;re here to help! 
            Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <a 
            href="mailto:support@langflow.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Mail size={20} />
            support@langflow.com
          </a>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-primary" size={28} />
              <h3 className="text-xl font-bold">Feedback</h3>
            </div>
            <p className="text-muted-foreground">
              Your feedback helps us improve LangFlow. Share your thoughts, report bugs, 
              or suggest new features to make the platform better for everyone.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="text-primary" size={28} />
              <h3 className="text-xl font-bold">Support</h3>
            </div>
            <p className="text-muted-foreground">
              Need help with your account or have questions about how to use LangFlow? 
              Our support team is ready to assist you with any issues.
            </p>
          </GlassCard>
        </div>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Is LangFlow really free?</h3>
              <p className="text-muted-foreground">
                Yes! LangFlow is completely free to use. Create an account and start learning German vocabulary right away.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How often should I practice?</h3>
              <p className="text-muted-foreground">
                We recommend practicing daily for at least 10-15 minutes. Consistency is key to language learning success!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use LangFlow on mobile?</h3>
              <p className="text-muted-foreground">
                Yes! LangFlow is fully responsive and works great on smartphones and tablets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What CEFR levels do you cover?</h3>
              <p className="text-muted-foreground">
                We currently offer vocabulary for A1, A2, B1, and B2 levels, covering over 5000 German words.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
