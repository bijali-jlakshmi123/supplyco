import StaticPageLayout from "@/components/static/StaticPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Supplyco Supermarket",
  description:
    "Find answers to common questions about ordering, delivery, payments, and more at Supplyco.",
};

export default function FAQPage() {
  return (
    <StaticPageLayout
      title="FAQ"
      subtitle="Find answers to commonly asked questions. Still have a question? Contact our support team."
    >
      <h2>General Questions</h2>

      <h3>What is Supplyco Supermarket?</h3>
      <p>
        Supplyco Supermarket is an online grocery platform dedicated to
        providing fresh and high-quality groceries, fruits, and vegetables to
        customers in Kerala at competitive prices.
      </p>

      <h3>Is there a minimum order value?</h3>
      <p>
        There is no minimum order value, but orders below ₹499 incur a small
        delivery fee of ₹50. Orders above ₹499 qualify for free delivery.
      </p>

      <h2>Ordering & Payments</h2>

      <h3>How can I pay for my order?</h3>
      <p>
        We accept various payment methods including Cash on Delivery (COD), UPI
        (GPay, PhonePe, etc.), Credit/Debit Cards, and Net Banking.
      </p>

      <h3>Can I cancel my order?</h3>
      <p>
        You can cancel your order any time before it enters the "Processing"
        stage. Once an order is out for delivery, cancellation is not possible.
      </p>

      <h2>Delivery</h2>

      <h3>How long does delivery take?</h3>
      <p>
        Depending on your chosen slot, delivery usually happens within 4-12
        hours of placing the order. Same-day delivery is available for orders
        placed before 2:00 PM.
      </p>

      <h3>What happens if I'm not home during delivery?</h3>
      <p>
        Our delivery executive will call you to reschedule or leave the order
        with a neighbor if requested. Please note that we cannot be responsible
        for the quality of perishable items if delivery is delayed due to
        unavailability.
      </p>

      <h2>Products</h2>

      <h3>Are the vegetables and fruits fresh?</h3>
      <p>
        Yes! We source our produce directly from local farmers and distributors
        daily to ensure maximum freshness and quality.
      </p>

      <h3>What if I receive a wrong or damaged item?</h3>
      <p>
        We have a "no questions asked" return policy for damaged or wrong items
        at the time of delivery. Please check your items before the delivery
        executive leaves.
      </p>
    </StaticPageLayout>
  );
}
