import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/page-header";
import clsx from "clsx";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "git-trace",
  description: "save your bookmarks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
    <body className={clsx("flex flex-col min-h-screen", inter.className)}>
      <Providers>
        <PageHeader />
        <main className="flex-grow">
          {children}
          <Toaster />
        </main>
      </Providers>
      <Footer />
    </body>
  </html>
  );
}
