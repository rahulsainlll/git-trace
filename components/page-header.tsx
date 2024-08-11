import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginButton, LogoutButton } from "./auth";

const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-2 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b">
        <div className="flex h-14 items-center justify-between text-xl">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/git3.png" alt="Logo" width={40} height={40} />
              <div className=" text-2xl">- trace </div>
            </div>
          </Link>
          <div>
            <LoginButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
