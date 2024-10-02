import prisma from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }:Params) {
  const { todoId } = params; // Get the todo ID from the request parameters

  try {
    // Delete the todo from the database
    await prisma.todo.delete({
      where: { id:todoId },
    });

    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to delete todo" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }:Params) {
  const { todoId } = params; // Get the todo ID from the request parameters
  const { title, description, completed } = await req.json(); // Parse JSON body
  

  try {
    // Delete the todo from the database
    const todo=await prisma.todo.update({
      where: { id:todoId },
      data:{
        title,
        description,
        completed
      }
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to edit todo" }, { status: 500 });
  }
}
