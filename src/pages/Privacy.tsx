import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-card">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
              <p>
                PulseTok ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Information from TikTok</h3>
              <p>
                When you connect your TikTok account to PulseTok, we collect the following information through TikTok Login Kit:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Profile Information:</strong> Display name, username, avatar URL, profile deep link, verification status</li>
                <li><strong>Account Statistics:</strong> Follower count, following count, total likes count, total video count</li>
                <li><strong>Video Statistics:</strong> View counts, likes, comments, shares, and other engagement metrics for your videos</li>
                <li><strong>Identifiers:</strong> Open ID and Union ID (unique identifiers for your TikTok account)</li>
                <li><strong>Video Performance Data:</strong> Analytics and insights about your video performance over time</li>
              </ul>
              <p className="mt-4">
                This data is collected solely for the purpose of displaying your TikTok statistics and analytics within our Service.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Technical Information</h3>
              <p>
                We automatically collect certain technical information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>To provide analytics and statistics:</strong> Display your TikTok video view counts, engagement metrics, and account statistics</li>
                <li><strong>To authenticate your identity:</strong> Verify your identity through TikTok Login Kit</li>
                <li><strong>To show your profile information:</strong> Display your TikTok profile (username, avatar, follower count, etc.)</li>
                <li><strong>To provide video analytics:</strong> Show detailed statistics about your videos, including views, likes, comments, and shares</li>
                <li><strong>To maintain the Service:</strong> Keep the platform running and provide you with access to your statistics</li>
                <li><strong>To improve the Service:</strong> Analyze usage patterns to enhance user experience</li>
                <li><strong>To ensure security:</strong> Detect and prevent fraud or abuse</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> We do NOT use your data to create content, post on your behalf, or share your information with third parties for marketing purposes. All data is used exclusively to display your TikTok statistics within our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p>
                Access tokens and user data are stored securely. We use industry-standard encryption and security practices to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Sharing and Disclosure</h2>
              <p>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist us in operating our Service (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. TikTok Data and Video Statistics</h2>
              <p>
                Your TikTok data, including video statistics and analytics, is accessed through TikTok's official API in accordance with TikTok's terms of service and privacy policy. We only access data that you explicitly authorize through the TikTok Login Kit process.
              </p>
              <p className="mt-4">
                <strong>What we access:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your TikTok profile information (read-only)</li>
                <li>Statistics about your videos (view counts, engagement metrics)</li>
                <li>Account-level statistics (follower count, total likes, etc.)</li>
              </ul>
              <p className="mt-4">
                <strong>What we do NOT access:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>We cannot post, edit, or delete your videos</li>
                <li>We cannot access your private messages or comments</li>
                <li>We cannot modify your account settings</li>
                <li>We only read statistics - we do not create or modify content</li>
              </ul>
              <p className="mt-4">
                You can revoke our access to your TikTok data at any time through your TikTok account settings. When you revoke access, we will delete your associated data from our systems, and you will no longer be able to view your statistics on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Revoke TikTok access at any time</li>
                <li>Opt-out of certain data collection</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">12. Third-Party Services</h2>
              <p>
                Our Service integrates with TikTok through TikTok Login Kit. Your use of TikTok is governed by TikTok's Terms of Service and Privacy Policy. We encourage you to review TikTok's privacy policy.
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

export default Privacy;

