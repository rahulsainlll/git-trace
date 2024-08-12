"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    console.log("Submitting:", data); // Add this line
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("Result:", result);

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
      });
    } else if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
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
                Sign In
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex justify-end border-gray-300 ">
          <Popover>
            <PopoverContent className=" text-center">
              Under Construction 🏗️ 🚧
            </PopoverContent>
            <Link
              href=""
              onClick={() => console.log("underconstruction")}
              className="text-sm text-[#425893] hover:text-gray-600"
            >
              <PopoverTrigger className="underline">Use GitHub</PopoverTrigger>
            </Link>
          </Popover>
        </div>
      </div>
    </div>
  );
}
