import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, title, author, category, stock } = await req.json();
    const updateBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        category,
        stock,
      },
    });
    return NextResponse.json(updateBook);
  } catch (error) {
    console.error("error updating book:", error);
    return NextResponse.json(
      { error: "failed to update book" },
      { status: 500 }
    );
  }
}
