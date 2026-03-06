import StaticPageLayout from "@/components/static/StaticPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Supplyco Supermarket",
  description:
    "Find information about delivery times, areas served, and shipping charges at Supplyco.",
};

export default function ShippingPage() {
  return (
    <StaticPageLayout
      title="Shipping & Delivery"
      subtitle="Fast and reliable delivery of fresh groceries to your doorstep."
    >
      <h2>1. Delivery Areas</h2>
      <p>
        Currently, Supplyco Supermarket delivers across{" "}
        <strong>Thiruvananthapuram city</strong> and surrounding suburbs within
        a 20km radius. We are constantly expanding our reach to serve more areas
        in Kerala.
      </p>

      <h2>2. Delivery Times</h2>
      <p>We offer multiple delivery slots to fit your schedule:</p>
      <ul>
        <li>
          <strong>Morning Slot:</strong> 7:00 AM - 11:00 AM (Order before 9:00
          PM previous day)
        </li>
        <li>
          <strong>Afternoon Slot:</strong> 1:00 PM - 5:00 PM (Order before 10:00
          AM same day)
        </li>
        <li>
          <strong>Evening Slot:</strong> 6:00 PM - 9:00 PM (Order before 2:00 PM
          same day)
        </li>
      </ul>

      <h2>3. Shipping Charges</h2>
      <p>We keep our delivery rates simple:</p>
      <ul>
        <li>
          <strong>Orders above ₹499:</strong> FREE Delivery
        </li>
        <li>
          <strong>Orders below ₹499:</strong> Flat ₹50 Delivery Fee
        </li>
      </ul>

      <h2>4. Tracking Your Order</h2>
      <p>
        Once your order is processed, you will receive a SMS with a tracking
        link. You can also view the status of your order in the "My Orders"
        section of your account.
      </p>

      <h2>5. Delivery Protocol</h2>
      <p>
        Our delivery executives follow all safety and hygiene protocols. We
        offer contactless delivery upon request. Please ensure someone is
        available to receive the orders, especially for chilled and frozen
        items.
      </p>
    </StaticPageLayout>
  );
}
