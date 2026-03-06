import StaticPageLayout from "@/components/static/StaticPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Supplyco Supermarket",
  description:
    "Read about our easy return and refund policy for all your grocery purchases.",
};

export default function ReturnsPage() {
  return (
    <StaticPageLayout
      title="Return & Refund Policy"
      subtitle="At Supplyco, we strive to ensure you are 100% satisfied with your purchase."
    >
      <h2>1. Conditions for Returns</h2>
      <p>
        In order for the Goods to be eligible for a return, please make sure
        that:
      </p>
      <ul>
        <li>The Goods were purchased in the last 7 days.</li>
        <li>The Goods are in the original packaging.</li>
        <li>
          Fresh produce (fruits, vegetables, milk) must be reported within 6
          hours of delivery if there's any quality issue.
        </li>
      </ul>

      <h2>2. Non-returnable Items</h2>
      <p>The following Goods cannot be returned:</p>
      <ul>
        <li>
          The supply of Goods made to Your specifications or clearly
          personalized.
        </li>
        <li>
          The supply of Goods which according to their nature are not suitable
          to be returned, deteriorate rapidly or where the date of expiry is
          over.
        </li>
        <li>
          The supply of Goods which are not suitable for return due to health
          protection or hygiene reasons and were unsealed after delivery.
        </li>
      </ul>

      <h2>3. Refund Process</h2>
      <p>
        We will reimburse You no later than 14 days from the day on which We
        receive the returned Goods. We will use the same means of payment as You
        used for the Order, and You will not incur any fees for such
        reimbursement.
      </p>

      <h2>4. Damaged Items</h2>
      <p>
        If you received a damaged product, please notify us immediately for
        assistance. For fresh groceries, please inspect the items at the time of
        delivery and return them to the delivery executive if you are
        unsatisfied.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about our Returns and Refunds Policy, please
        contact us at support@supplyco.com.
      </p>
    </StaticPageLayout>
  );
}
