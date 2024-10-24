"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export const LoginButton = () => {
	return (
		<Button
			onClick={() => signIn()}
			variant={"secondary"}
			className="text-sm text-[#425893] text-start dark:text-slate-50 px-2 dark:border"
		>
			Login
		</Button>
	);
};

export const SignupButton = () => {
	return (
			<Button 
				variant={"secondary"} 
				className="text-sm text-[#425893] text-start dark:text-slate-50 px-2 dark:border"
			>
				<Link href="/auth/signup">
					Register
				</Link>
			</Button>
	)
}

export const LogoutButton = () => {
	return (
		<Button
			variant={"ghost"}
			onClick={() => signOut()}
			className="text-sm text-[#425893] text-start dark:text-slate-50 px-2"
		>
			Logout
		</Button>
	);
};
