import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-card">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using PulseTok ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description of Service</h2>
              <p>
                PulseTok is a web application that provides TikTok analytics and statistics. The Service allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Connect their TikTok account through secure authentication</li>
                <li>View detailed statistics about their TikTok videos, including view counts, likes, comments, and shares</li>
                <li>Analyze performance metrics and trends for their content</li>
                <li>Access comprehensive analytics about their TikTok account activity</li>
                <li>View insights and statistics about their video performance over time</li>
              </ul>
              <p className="mt-4">
                The Service provides users with valuable insights into their TikTok content performance to help them understand their audience and improve their content strategy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Accounts</h2>
              <p>
                To use certain features of the Service, you must register for an account by connecting your TikTok account. You are responsible for maintaining the security of your account and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. TikTok Integration</h2>
              <p>
                PulseTok uses TikTok Login Kit to authenticate users. By connecting your TikTok account, you grant PulseTok permission to access your TikTok data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your TikTok profile information (username, display name, avatar)</li>
                <li>Statistics about your videos (view counts, likes, comments, shares)</li>
                <li>Account statistics (follower count, following count, total likes, video count)</li>
                <li>Video performance data and analytics</li>
              </ul>
              <p className="mt-4">
                This access is granted in accordance with TikTok's terms of service and privacy policy. You can revoke this access at any time through your TikTok account settings. When you revoke access, you will no longer be able to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Usage</h2>
              <p>
                We use the data obtained from TikTok solely for the purpose of providing the Service. We do not sell, rent, or share your personal information with third parties without your consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to use this Service</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must not use the Service for any illegal or unauthorized purpose</li>
                <li>You must not violate any laws in your jurisdiction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
              <p>
                PulseTok shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through our website.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link to="/" className="text-primary hover:underline">
              ← Вернуться на главную
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;

