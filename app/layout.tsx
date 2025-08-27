import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YaYa_dashboard",
  description: " A simple dashboard that shows a list of transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
