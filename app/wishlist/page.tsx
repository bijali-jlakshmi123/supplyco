import WishlistClient from "@/components/wishlist/WishlistClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | Supplyco Supermarket",
  description:
    "View and manage your favorite products saved at Supplyco Supermarket.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
