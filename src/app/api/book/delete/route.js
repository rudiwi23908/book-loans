import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedBook = await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deletedBook);
  } catch (error) {
    console.error("error deleting book:", error);
    return NextResponse.json(
      { error: "failed to delete book" },
      { status: 500 }
    );
  }
}
