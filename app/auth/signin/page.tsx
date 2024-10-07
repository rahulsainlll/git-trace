"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pageloader from "@/components/ui/Pageloader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useState } from "react";
import loader from "lucide-react";
import githubLogo from "/public/githubLogo.png";
import googleLogo from "/public/google.png";
import Image from "next/image";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleGithubSignUp = () => {
    signIn("github");
    // router.push("/");
  };
  
  const handleGoogleSignUp = () => {
    signIn("google");
    // router.push("/");
  };

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
      });
    } else if (result?.ok) {
      router.push("/");
      toast({
        description: "Login successful",
      });

      setTimeout(() => {
        router.refresh();
      }, 100);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-lg">
        <h2 className="text-xl font-bold text-[#425893] text- mb-4">
          Login into git-trace
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
                      This is the email address you will use to sign in.
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
                      Enter your password to log in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#425893]">
                {Loading ? <Pageloader /> : "Login"}
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
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-sm text-[#425893] hover:text-gray-600 underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
