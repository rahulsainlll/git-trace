"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button onClick={() => signIn()} className="text-base text-[#425893]">
      Enter
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="text-base text-[#425893]">
      Logout
    </button>
  );
};
