import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena Next.js PostgreSQL Starter",
  description: "Starter template with Next.js, Drizzle, and PostgreSQL.",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
