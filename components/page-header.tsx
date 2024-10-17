"use client";

import { usePathname, useRouter } from "next/navigation"; // Import `usePathname` for App Router
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./auth";
import { Badge } from "./ui/badge";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import UserAccountDropDown from "./UserAccDropDown";

const PageHeader = () => {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get current path directly
  const [activePath, setActivePath] = useState(pathname); // Initialize with current path

  useEffect(() => {
    setActivePath(pathname); // Update when pathname changes
  }, [pathname]);

  const handleGitHubClick = () => {
    window.location.href = "https://github.com/rahulsainlll/git-trace";
  };

  const handleTweetClick = () => {
    const tweetText = encodeURIComponent(
      `Check out "git-trace dot com" made for GSOC folks\n\n～one place multiple Issues～\nSearch the repository -> save individual repo & issues\n\nGSOC'25 folks select and save your issues\n\napp/users/ https://git-trace.vercel.app\napp/contributor/ https://github.com/rahulsainlll/git-trace`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  const isActive = (href:string) =>
    activePath === href ? "text-black font-bold" : "text-muted-foreground";

  return (
    <header className="sticky inset-x-0 top-2 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b sm:block hidden">
        <div className="flex h-14 items-center justify-between text-xl">
          <div className="flex items-center gap-5">
            <Link href="/">
              <div className="flex items-center">
                <Image src="/git3.png" alt="Logo" width={38} height={38} />
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
              <div className="ml-2 text-lg font-light text-muted-foreground  hover:underline ">
                Contributors
              </div>
            </Link>
            <Link href="/faq">
              <div className="ml-2 text-lg font-light text-muted-foreground  hover:underline ">
               FAQ
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className="gap-1 bg-slate-50 hover:bg-slate-100"
              variant="outline"
              onClick={handleGitHubClick}
              style={{ cursor: "pointer" }}
            >
              <GitHubLogoIcon />
              Star
            </Badge>

            <Badge
              className="gap-1 rounded-xl"
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet" />
              Post
            </Badge>

            {session ? (
              // <LogoutButton />
              <UserAccountDropDown />
            ) : (
              <>
                <LoginButton />
                <p className="text-sm">|</p>
                <Link href="/auth/signup">
                  <button className="text-base text-[#425893]">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex h-16 items-center justify-between border-b px-2">
        <Link href="/" className="flex items-center">
          <Image src="/git3.png" alt="Logo" width={38} height={38} />
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Badge
              className="gap-1 bg-slate-50 hover:bg-slate-100"
              variant="outline"
              onClick={handleGitHubClick}
              style={{ cursor: "pointer" }}
            >
              <GitHubLogoIcon />
              Star
            </Badge>

            <Badge
              className="gap-1 rounded-xl"
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet" />
              Post
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 mt-2">
              <DropdownMenuItem>
                <div className="flex flex-col gap-4 justify-start">
                  <Link href="/dashboard">
                    <div
                      className={`text-base text-[#425893] hover:underline ${isActive(
                        "/dashboard"
                      )}`}
                    >
                      Dashboard
                    </div>
                  </Link>

                  {session ? (
                    <LogoutButton />
                  ) : (
                    <>
                      <LoginButton />
                      <Link href="/auth/signup">
                        <button className="text-base text-[#425893]">
                          Register
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
