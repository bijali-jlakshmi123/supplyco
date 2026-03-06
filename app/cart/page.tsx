import CartPageClient from "@/components/cart/CartPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Shopping Cart | Supplyco Supermarket",
  description:
    "View and manage items in your shopping cart at Supplyco Supermarket.",
};

export default function CartPage() {
  return <CartPageClient />;
}
