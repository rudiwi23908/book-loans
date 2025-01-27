import prisma from "../../../lib/prisma"; // Pastikan prisma sudah terpasang
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive", // case-insensitive search
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
