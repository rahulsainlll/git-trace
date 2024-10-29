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
import axios from "axios";

const emailSchema = z.object({
  email: z.string().email("Invalid email address")
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function SignInPage() {
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    },
  });

  const router = useRouter();

  const onSubmit = async (data: EmailFormData) => {
    try {
        setLoading(true);
        const result = await axios.post('/api/auth/forgot-password/email', {
            email: data.email
        })
    
        router.push(`/auth/forgot-password/otp/${result.data.id}`);
        toast({
            description: "Otp sent",
        });
    
        setTimeout(() => {
            router.refresh();
        }, 100);
    } catch (error: any) {
        toast({
            title: "Login Failed",
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
          Enter your Email
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
                      You will receive OTP on this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#425893]">
                {Loading ? <Pageloader /> : "Send OTP"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex justify-end border-gray-300">
          <Link
            href="/auth/signin"
            className="text-sm text-[#425893] hover:text-gray-600 underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
