import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { sendEmail } from "@/helper/sendMail";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.user.update({
    where: {
        email,
    },
    data: {
        forgotOTP : verifyCode,
    }
  })

  const emailResponse = await sendEmail(email, existingUser.id, verifyCode, true);

  if (!emailResponse.success) {
    return new Response(JSON.stringify({
        success: false,
        message: emailResponse.message,
        
    }), { status: 500 });
  }

  return new Response(JSON.stringify({
      success: true,
      message: "Verification code sent.",
      id: existingUser.id
  }), { status: 201 });

}
