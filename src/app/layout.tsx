import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SpendPilot | Stop overpaying for AI",
  description: "SpendPilot helps startups cut unnecessary AI spending in minutes.",
  openGraph: {
    title: "SpendPilot | Stop overpaying for AI",
    description: "SpendPilot helps startups cut unnecessary AI spending in minutes.",
    type: "website",
    url: "https://spendpilot.ai", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
