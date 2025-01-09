import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { book_id, borrower_name, borrow_date, return_date, status } =
      await req.json();
    const newTransaction = await prisma.transaction.create({
      data: {
        book_id,
        borrower_name,
        borrow_date: new Date(borrow_date),
        return_date: new Date(return_date),
        status,
      },
    });
    return NextResponse.json(newTransaction);
  } catch (error) {
    console.error("error creating transaction:", error);
    return NextResponse.json(
      { error: "failed to create transaction" },
      { status: 500 }
    );
  }
}
