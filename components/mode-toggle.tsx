"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle({ size="icon" }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size={size} onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}
