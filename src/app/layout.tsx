import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SortBox — Your home, finally sorted.",
  description: "A monthly decluttering kit — glass containers, drawer dividers, labels, and an app that walks you through one room at a time. First box free for founding members.",
  openGraph: {
    title: "SortBox — Your home, finally sorted.",
    description: "Monthly decluttering kit + app. Eco-friendly, plastic-free. First box free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}