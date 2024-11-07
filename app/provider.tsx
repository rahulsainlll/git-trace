"use client";

import ProgressBar from "@/components/Progressbar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ScrollToTop } from "react-simple-scroll-up";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {" "}
      <ProgressBar /> {children}{" "}
      <ScrollToTop
        className="scroll-to-top"
        symbol={<span style={{ fontSize: "2.2rem" }}>&#8593;</span>}
        size={60}
        bgColor="#2C2A2A"
        strokeWidth={5}
        strokeFillColor="#fff"
        strokeEmptyColor="#505050"
        symbolColor="#F5FBFA"
      />{" "}
    </NextThemesProvider>
  );
}