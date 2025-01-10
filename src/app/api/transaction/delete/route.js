import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedTransaction = await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deletedTransaction);
  } catch (error) {
    console.error("error deleting transaction:", error);
    return NextResponse.json(
      { error: "failed to delete transaction" },
      { status: 500 }
    );
  }
}
