"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return <button onClick={() => signIn()} className="text-lg">enter</button>;
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="text-lg">
      logout
    </button>
  );
};
