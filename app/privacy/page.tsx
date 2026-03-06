import StaticPageLayout from "@/components/static/StaticPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Supplyco Supermarket",
  description:
    "Learn how Supplyco Supermarket collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="Last updated: March 05, 2026. Your privacy is important to us."
    >
      <h2>1. Introduction</h2>
      <p>
        Welcome to Supplyco Supermarket. We are committed to protecting your
        personal data and your right to privacy. If you have any questions or
        concerns about this privacy notice, or our practices with regards to
        your personal information, please contact us at privacy@supplyco.com.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect personal information that you voluntarily provide to us when
        you register on the Services, express an interest in obtaining
        information about us or our products, when you participate in activities
        on the Services or otherwise when you contact us.
      </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Names, phone numbers, email
          addresses, mailing addresses, usernames, passwords, contact
          preferences, and other similar information.
        </li>
        <li>
          <strong>Payment Data:</strong> We may collect data necessary to
          process your payment if you make purchases, such as your payment
          instrument number.
        </li>
        <li>
          <strong>Location Data:</strong> We collect location data such as
          information about your device's location, which can be either precise
          or imprecise.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use personal information collected via our Services for a variety of
        business purposes described below. We process your personal information
        for these purposes in reliance on our legitimate business interests, in
        order to enter into or perform a contract with you, with your consent,
        and/or for compliance with our legal obligations.
      </p>

      <h2>4. Sharing Your Information</h2>
      <p>
        We only share information with your consent, to comply with laws, to
        provide you with services, to protect your rights, or to fulfill
        business obligations.
      </p>

      <h2>5. Security of Your Information</h2>
      <p>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable.
      </p>
    </StaticPageLayout>
  );
}
