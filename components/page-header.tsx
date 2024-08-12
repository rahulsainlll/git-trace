"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./auth";

const PageHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky inset-x-0 top-2 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b">
        <div className="flex h-14 items-center justify-between text-xl">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/git3.png" alt="Logo" width={40} height={40} />
              <div className="text-2xl">- trace</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {session ? (
              <LogoutButton />
            ) : (
              <>
                <LoginButton />
                <p className="text-sm">|</p>
                <Link href="/auth/signup">
                  <button className="text-base text-[#425893]">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
