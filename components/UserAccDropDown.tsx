"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserImage from "./UserImage";

export default function UserAccountDropDown() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[2rem] flex items-center p-[0.2rem]  justify-center h-[2rem]">
            {!user.image ? (
              <div className="p-1 border-2 rounded-md border-[#1a1a1a]">
                <UserRound />
              </div>
            ) : (
              <UserImage image={user.image} name={user?.name} />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="!w-[15rem] dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg">
            <DropdownMenuLabel className="flex gap-4 items-center">
              <div className="!w-[2rem] flex items-center p-[0.2rem]  justify-center !h-[2rem]">
                {!user.image ? (
                  <div className="p-1 border-2 rounded-full border-[#1a1a1a]">
                    <UserRound />
                  </div>
                ) : (
                  <UserImage image={user.image} name={user?.name} />
                )}
              </div>

              <div className="flex flex-col">
                <span className="max-w-[200px]">{user?.name}</span>
                <span className="text-[0.8rem] max-w-[200px] text-gray-400">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user && (
              <>
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ callbackUrl: "/" });
                    router.push("/");
                  }}
                  className=" flex gap-2 focus:bg-[#f34e4e] cursor-pointer"
                >
                  <LogOut size={15} />
                  Logout
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
