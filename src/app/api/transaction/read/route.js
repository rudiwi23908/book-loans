import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const transaction = await prisma.transaction.findMany({
      include: {
        book: true,
      },
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("error reading transaction:", error);
    return NextResponse.json(
      { error: "failed to read transaction" },
      { status: 500 }
    );
  }
}
