"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pageloader from "@/components/ui/Pageloader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ToastAction } from "@radix-ui/react-toast";
import githubLogo from "/public/githubLogo.png";
import googleLogo from "/public/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [Loading, setLoading] = useState<boolean>(false);
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();


  const handleGithubSignUp =  () => {
     signIn("github");
    // router.push("/");
  };

  const handleGoogleSignUp = async () => {
    await signIn("google");
    // router.push("/");
  };

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/signup", data);
      router.push("/auth/signin");
      toast({
        title: "Registration Successful 🎉",
        description:
          "Your account has been successfully created. Please log in to continue.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create an account. Please try again",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white  border rounded-lg">
        <h2 className="text-xl font-bold text-[#425893] text- mb-4">
          Register in git-trace
        </h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the email address you will use to sign up.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a strong password for your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#425893] hover:bg-[#425485]"
              >
                {Loading ? <Pageloader /> : "Register"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex mb-5">
          <button
            onClick={handleGithubSignUp}
            className="w-full flex items-center font-semibold justify-center h-8 px-6 mt-4 mr-1 text-sm transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
          >
            <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
            <span className="ml-4">Github</span>
          </button>
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center font-semibold justify-center h-8 px-6 mt-4 ml-1 text-sm  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
          >
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">Google</span>
          </button>
        </div>
        <div className="flex justify-end border-gray-300">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-sm text-[#425893] hover:text-gray-600 underline"
            >
              Log in
            </Link>
          </p>

          {/* <div className="flex justify-end border-gray-300 ">
            <Popover>
              <PopoverContent className=" text-center">
                Under Construction 🏗️ 🚧
              </PopoverContent>
              <Link
                href=""
                onClick={() => console.log("underconstruction")}
                className="text-sm text-[#425893] hover:text-gray-600"
              >
                <PopoverTrigger className="underline">
                  Use GitHub
                </PopoverTrigger>
              </Link>
            </Popover>
          </div> */}
        </div>
      </div>
    </div>
  );
}
