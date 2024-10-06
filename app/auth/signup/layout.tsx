import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Git-Trace account to start bookmarking and managing your favorite GitHub repositories and issues.",
  robots: "noindex, nofollow",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
