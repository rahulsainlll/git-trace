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
			className="text-base text-[#425893] text-start border border-[#425893] hover:text-white hover:bg-[#425893] transition-all duration-300 rounded px-3 py-1 ml-3"
		>
			Logout
		</button>
	);
};
