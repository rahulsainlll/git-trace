import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Securely access your Git-Trace account to manage GitHub bookmarks and personalize your experience.",
  robots: "noindex, nofollow",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
