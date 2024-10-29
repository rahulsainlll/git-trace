import prisma from "@/lib/prisma";

export async function POST(request: Request) {


    try {
        const { id, otp } = await request.json();
        const existingUser = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!existingUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "user not found"
            }), {
                status: 400
            });
        }
        console.log(existingUser.forgotOTP)
        console.log(otp);
        

        if(existingUser.forgotOTP !== otp){
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid OTP"
            }), {
                status: 400
            });
        }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                forgotOTP : "",
            }
        })

        return new Response(JSON.stringify({
            success: true,
            message: "Verification successful."
        }), { status: 201 });

    } catch (error) {
        console.error("Error sending mail", error);
        return new Response(JSON.stringify({
            success: false,
            message: "verification unsuccessful, try again later"
        }), {
            status: 500
        });
    }
}
