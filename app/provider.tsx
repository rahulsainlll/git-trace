"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}