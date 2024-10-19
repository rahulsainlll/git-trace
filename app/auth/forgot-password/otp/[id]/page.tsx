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

const otpSchema = z.object({
  otp: z.string()
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function SignInPage() {
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ id: string }>()
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    },
  });

  const router = useRouter();

  const onSubmit = async (data: OtpFormData) => {
    try {
        setLoading(true);
        const result = await axios.post('/api/auth/forgot-password/verifyotp', {
            otp: data.otp,
            id: params.id
        })
    
        router.push(`/auth/forgot-password/passwordreset/${params.id}`);
        toast({
            description: result.data.message,
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
          Enter your OTP
        </h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="OTP"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Verify received OTP
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#425893]">
                {Loading ? <Pageloader /> : "Verify"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
