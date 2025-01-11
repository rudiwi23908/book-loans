import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const { title, author, category, stock } = body;
    if (!title || !author || !category || !stock) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        stock: parseInt(stock), // Ensure stock is an integer
      },
    });

    return NextResponse.json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "failed to create book" },
      { status: 500 }
    );
  }
}
