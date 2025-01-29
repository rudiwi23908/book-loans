import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = Number(await params.id);

    // Hapus buku dari database
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Buku berhasil dihapus", deletedBook },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Buku tidak ditemukan atau terjadi kesalahan",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
