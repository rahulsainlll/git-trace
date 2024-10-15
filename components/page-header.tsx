"use client";

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

const PageHeader = () => {
  const { data: session } = useSession();

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

  return (
    <header
      className="sticky inset-x-0 top-2 z-30 w-full transition-all"
      style={{
        background: "linear-gradient(to bottom, rgba(6, 182, 212, 1), rgba(255, 255, 255, 1))", // Gradient from bg-cyan-400 to white
        fontFamily: "'Marker Felt', fantasy",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Marker+Felt&display=swap" rel="stylesheet" />
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b sm:block hidden">
        <div className="flex h-20 items-center justify-between text-3xl"> {/* Increased text size */}
          <div className="flex items-center gap-5">
            <Link href="/">
              <div className="flex items-center">
                <Image src="/git3.png" alt="Logo" width={38} height={38} />
                <div className="text-3xl text-white">- trace</div> {/* Increased the font size and changed color to white */}
              </div>
            </Link>

            <Link href="/dashboard">
              <div className="ml-2 text-2xl text-white font-light hover:underline"> {/* Increased text size and changed color */}
                Dashboard
              </div>
            </Link>
            <Link href="/blog">
              <div className="ml-2 text-2xl text-white font-light hover:underline"> {/* Increased text size and changed color */}
                Blogs
              </div>
            </Link>
            <Link href="/about">
              <div className="ml-2 text-2xl text-white font-light hover:underline"> {/* Increased text size and changed color */}
                About
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
              <span className="text-white">Star</span> {/* Changed color to white */}
            </Badge>

            <Badge
              className="gap-1 rounded-xl hover: "
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet" />
              <span className="text-white">Post</span> {/* Changed color to white */}
            </Badge>

            {session ? (
              <LogoutButton />
            ) : (
              <>
                <LoginButton />
                <p className="text-sm text-white">|</p> {/* Changed color to white */}
                <Link href="/auth/signup">
                  <button className="text-base text-white">Register</button> {/* Changed color to white */}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden flex h-16 items-center justify-between border-b px-2">
        <Link href="/" className="flex items-center ">
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
              <span className="text-white">Star</span> {/* Changed color to white */}
            </Badge>

            <Badge
              className="gap-1 rounded-xl hover: "
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <Image src="/twitter-x.svg" width={12} height={12} alt="Tweet" />
              <span className="text-white">Post</span> {/* Changed color to white */}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="text-white" /> {/* Changed color to white */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 mt-2">
              <DropdownMenuItem>
                <div className="flex flex-col gap-4 justify-start">
                  <Link href="/dashboard">
                    <div className="text-base text-[#425893] text-white hover:underline"> {/* Changed color to white */}
                      Dashboard
                    </div>
                  </Link>

                  {session ? (
                    <LogoutButton />
                  ) : (
                    <>
                      <LoginButton />
                      <Link href="/auth/signup">
                        <button className="text-base text-white"> {/* Changed color to white */}
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
