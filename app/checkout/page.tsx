import CheckoutClient from "@/components/checkout/CheckoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Supplyco Supermarket",
  description:
    "Complete your purchase at Supplyco Supermarket through our secure checkout process.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
