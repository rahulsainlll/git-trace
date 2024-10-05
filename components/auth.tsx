"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="text-base text-[#425893] text-start"
    >
      Login
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-[#f5f5dc] text-[#425893] font-medium py-2 px-4 rounded-lg shadow-md hover:bg-[#425893] hover:text-white transition duration-300"
    >
      Logout 🏃🏻‍➡️🏃🏻‍♂️‍➡️🏃🏻‍♀️‍➡️
    </button>
  );
};

