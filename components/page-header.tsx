"use client";

import { usePathname, useRouter } from "next/navigation"; // Import usePathname for App Router
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./auth";
import { Badge } from "./ui/badge";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import UserAccountDropDown from "./UserAccDropDown";
import { ModeToggle } from "./mode-toggle";
import { GoogleTranslate } from "./GoogleTranslate";

const PageHeader = ({ prefLangCookie }: { prefLangCookie: string }) => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleGitHubClick = () => {
    window.location.href = "https://github.com/rahulsainlll/git-trace";
  };

  const handleTweetClick = () => {
    const tweetText = encodeURIComponent(
      "Check out 'git-trace dot com' made for GSOC folks\n\n～one place multiple Issues～\nSearch the repository -> save individual repo & issues\n\nGSOC'25 folks select and save your issues\n\napp/users/ https://git-trace.vercel.app\napp/contributor/ https://github.com/rahulsainlll/git-trace"
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  const isActive = (href: string) =>
    activePath === href
      ? "font-bold text-black dark:text-white"
      : "text-muted-foreground dark:text-gray-400";


  return (
    <header className="sticky inset-x-0 top-2 z-30 w-full transition-all bg-white/20 dark:bg-black backdrop-blur-md">
      <div className="w-full px-2.5 lg:px-20 relative mx-auto border-b">
        {/* Desktop Navbar */}
        <div className="hidden lg:flex h-14 items-center justify-between text-xl">
          <div className="flex items-center gap-5">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src={theme === "dark" ? "/git4.png" : "/git3.png"}
                  alt="Logo"
                  width={38}
                  height={38}
                />
                <div className="text-xl">- trace</div>
              </div>
            </Link>

            <Link href="/dashboard">
              <div
                className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/dashboard"
                )}`}
              >
                Dashboard
              </div>
            </Link>
            <Link href="/popular">
            <div
                className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/popular"
                )}`}
              >
                Popular
              </div>
            </Link>
            <Link href="/blog">
              <div
                className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/blog"
                )}`}
              >
                Blogs
              </div>
            </Link>

            <Link href="/about">
              <div
                className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/about"
                )}`}
              >
                About
              </div>
            </Link>
            <Link href="/contributor">
            <div
                className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/contributor"
                )}`}
              >
                Contributors
              </div>
            </Link>
            <Link href="/faq">
              <div className={`ml-2 text-lg font-light hover:underline ${isActive(
                  "/faq"
                )}`}>
               FAQ
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Badge
              className="gap-1 bg-slate-50 hover:bg-slate-100 text-neutral-900"
              variant="outline"
              onClick={handleGitHubClick}
              style={{ cursor: "pointer" }}
            >
              <GitHubLogoIcon className="dark:text-neutral-950" />
              Star
            </Badge>

            <Badge
              className="gap-1 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800"
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet" />
              Post
            </Badge>

            {session ? (
              <UserAccountDropDown />
            ) : (
              <>
                <LoginButton />
                <p className="text-sm">|</p>
                <Link href="/auth/signup">
                  <button className="text-base text-[#425893] dark:text-slate-50">
                    Register
                  </button>
                </Link>
              </>
            )}
            <GoogleTranslate prefLangCookie={prefLangCookie} />
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex h-16 items-center justify-between border-b px-4 bg-white dark:bg-neutral-950 dark:border-neutral-800">
        <Link href="/" className="flex items-center">
            <Image src="/git3.png" alt="Logo" width={38} height={38} />
        </Link>
                
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Open Menu">
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 mt-3 rounded-lg shadow-lg dark:bg-neutral-900">
              <DropdownMenuItem>
                <div className="flex flex-col gap-3 text-center">
                  {["/dashboard", "/auth/signup", "/faq"].map((href) => (
                    <Link href={href} key={href} className="block">
                      <span
                        className={`text-base font-medium hover:underline ${isActive(
                          href
                        )}`}
                      >
                        {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                      </span>
                    </Link>
                  ))}
                  {session ? <LogoutButton /> : <LoginButton />}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
                
          <Badge
            className="flex items-center gap-1 bg-neutral-950 text-white hover:bg-neutral-800 p-2 rounded-md transition-colors duration-150"
            variant="outline"
            onClick={handleGitHubClick}
            style={{ cursor: "pointer" }}
            aria-label="Star on GitHub"
          >
            <GitHubLogoIcon />
            Star
          </Badge>
                
          <Badge
            className="flex items-center gap-1 bg-neutral-950 text-white hover:bg-neutral-800 p-2 rounded-md transition-colors duration-150"
            onClick={handleTweetClick}
            style={{ cursor: "pointer" }}
            aria-label="Share on Twitter"
          >
            <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet Icon" />
            Post
          </Badge>
        </div>
        </div>

      </div>
    </header>
  );
};

export default PageHeader;
