"use client";

import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";

const passwordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SignInPage() {
  const params = useParams<{ id: string }>()
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });

  const router = useRouter();

  const onSubmit = async (data: PasswordFormData) => {
    try {
        setLoading(true);
        const result = await axios.post('/api/auth/forgot-password/resetpassword', {
            password: data.password,
            id: params.id
        })
    
        router.push(`/auth/signin`);
        toast({
            description: "Password changed successfully",
        });
    
        setTimeout(() => {
            router.refresh();
        }, 100);
    } catch (error: any) {
        toast({
            title: "password not chnaged",
            description: error.message,
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-lg">
        <h2 className="text-xl font-bold text-[#425893] text- mb-4">
          Enter your New Password
        </h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="w-full"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        className="w-full"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#425893]">
                {Loading ? <Pageloader /> : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
