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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ToastAction } from "@radix-ui/react-toast";
import { AtSign, Eye, EyeOff } from "lucide-react";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmpassword: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    if (data.password !== data.confirmpassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure your passwords match.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/auth/signup", data);
      router.push("/auth/signin");
      toast({
        title: "Registration Successful 🎉",
        description: "Your account has been successfully created. Please log in to continue.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create an account. Please try again",
      });
    }
    setLoading(false);
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen ">
<<<<<<< HEAD
      <div className="w-full max-w-md p-6 bg-white dark:bg-black border rounded-lg">
        <h2 className="text-xl font-bold text-[#425893] dark:text-blue-500 text- mb-4">
=======
      <div className="w-full max-w-md p-6 bg-white dark:bg-[#141414]  border rounded-lg">
        <h2 className="text-xl font-bold text-[#5469a2] text- mb-4">
>>>>>>> 659a15b4cdcdc3ff2a2e14f904eb60480af67792
          Register in git-trace
        </h2>
        <div className="border-b dark:border-gray-700 border-gray-300 pb-4 mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full"
                      />
=======
                    <FormLabel className="dark:text-white text-black">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          placeholder="Email"
                          {...field}
                          className="w-full dark:text-black"
                        />
                        <div className="ml-2 text-gray-500 focus:outline-none">
                          <AtSign />
                        </div>
                      </div>
>>>>>>> 659a15b4cdcdc3ff2a2e14f904eb60480af67792
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
<<<<<<< HEAD
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="w-full"
                      />
=======
                    <FormLabel className="dark:text-white text-black">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          className="w-full dark:text-black"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-2 text-gray-500 focus:outline-none"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
>>>>>>> 659a15b4cdcdc3ff2a2e14f904eb60480af67792
                    </FormControl>
                    <FormDescription>
                      Enter a strong password for your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white text-black">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...field}
                          className="w-full dark:text-black"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="ml-2 text-gray-500 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Confirm password by entering it again
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#425893] text-white hover:text-black"
              >
                {Loading ? <Pageloader /> : "Register"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex justify-end border-gray-300">
          <Link
            href="/auth/signin"
            className="text-sm text-[#425893] dark:text-blue-500 hover:text-gray-600 underline"
          >
            login
          </Link>

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
=======
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Image src={theme === "dark" ? "/git4.png" : "/git3.png"} alt="Logo" width={60} height={60} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Register for git-trace</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Create an account to track all your GitHub repositories.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-black">Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input placeholder="Enter your email" {...field} className="w-full dark:text-black" />
                      <div className="ml-2 text-gray-500">
                        <AtSign />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-black">Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full dark:text-black"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-500">
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-black">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                        className="w-full dark:text-black"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="ml-2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary text-white">
              {loading ? <Pageloader /> : "Register"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Or sign up with</p>
          <Button variant="outline" className="w-full mt-2">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign up with Google
          </Button>
>>>>>>> 383e7974f0a0fff21996aa91b2c8c87f53f89daa
        </div>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline">Log in</Link>
        </div>
        <p className="mt-8 text-xs text-center text-gray-500 dark:text-gray-400">© 2024 git-trace Inc. All rights reserved.</p>
      </div>
    </div>
  );
}