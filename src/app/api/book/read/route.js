import prisma from "../../../lib/prisma"; // Pastikan prisma client sudah diatur di file ini

// GET: Fetch book details by ID or all books if no ID is provided
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id"); // Ambil parameter ID dari query

  try {
    let books;

    if (bookId) {
      // Jika ID ada, cari buku berdasarkan ID
      books = await prisma.book.findUnique({
        where: { id: Number(bookId) },
      });

      if (!books) {
        return new Response(JSON.stringify({ error: "Book not found" }), {
          status: 404,
        });
      }
    } else {
      // Jika tidak ada ID, ambil semua buku
      books = await prisma.book.findMany();
    }

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch books" }), {
      status: 500,
    });
  }
}
