import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOKI & TOMO",
  description: "Japanese stationery subscription. Stationery for your quiet time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
