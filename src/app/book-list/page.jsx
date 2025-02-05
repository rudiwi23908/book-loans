import React from "react";
import { BookList } from "../components/BookList";
import Link from "next/link";
const BookListPage = () => {
  return (
    <section id="book-list" className="m-3">
      <h2 className="text-xl font-semibold">Daftar Buku</h2>
      <div className="flex justify-end">
        <Link href="/book-list/book-form">
          <button className="mb-3 bg-blue-600 px-4 py-2 rounded text-white">
            Tambah Buku
          </button>
        </Link>
      </div>
      <BookList />
    </section>
  );
};

export default BookListPage;
