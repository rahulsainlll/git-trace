
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {

    try {
        const { id, password } = await request.json();
        
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
        
        const hashPassword = await hash(password, 10);

        await prisma.user.update({
            where: {
                id,
            },
            data: {
                password: hashPassword,
            }
        })

        return new Response(JSON.stringify({
            success: true,
            message: "password changed successfully."
        }), { status: 201 });

    } catch (error) {
        console.error("Error sending mail", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Password updation unsuccessful, try again later"
        }), {
            status: 500
        });
    }
}
