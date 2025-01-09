import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, author, category, stock } = await req.json();
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        stock,
      },
    });
    return NextResponse.json(newBook);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "failed to create user" },
      { status: 500 }
    );
  }
}
