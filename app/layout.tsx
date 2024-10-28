import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/page-header";
import clsx from "clsx";
import { Providers, ThemeProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/ui/footer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

// fallback to the production URL
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://git-trace.vercel.app/";

export const metadata: Metadata = {
  title: {
    default: "Git-Trace",
    template: "%s | Git-Trace",
  },
  description:
    "Instantly search, view, and bookmark GitHub repositories and issues. Streamline your workflow and keep your favorite projects at your fingertips!",
  openGraph: {
    title: "Git-Trace",
    description:
      "Instantly search, view, and bookmark GitHub repositories and issues. Streamline your workflow and keep your favorite projects at your fingertips!",
    type: "website",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/git3.png`,
        width: 800,
        height: 600,
        alt: "Git-Trace OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Git-Trace",
    description:
      "Instantly search, view, and bookmark GitHub repositories and issues.",
    images: `${baseUrl}/git3.png`,
  },
  keywords: [
    "GitHub repositories",
    "GitHub issues",
    "repository search",
    "workflow tools",
    "developer tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getPrefLangCookie = (): string => {
    return cookies().get("googtrans")?.value ?? "en";
  };
  return (
    <html lang="en" className="h-full">
      <body className={clsx("flex flex-col min-h-screen", inter.className)}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <PageHeader prefLangCookie={getPrefLangCookie()} />
            <main className="flex-grow">
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
