import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Transfer",
  description: "International money transfer service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
