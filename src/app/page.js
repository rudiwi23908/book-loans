"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// async function fetchBooks() {
//   const res = await fetch("/api/book/read", {
//     cache: "no-store", // Menghindari caching (opsional tergantung kebutuhan)
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBooks().then((data) => setBooks(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to create book");
      }
      const newBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setFormData({
        title: "",
        author: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.log(formData);
      console.error("Error:", error);
    }
  };

  const handleBookClick = (id) => {
    router.push(`/book/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="bg-blue-800 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Aplikasi Peminjaman Buku</h1>
      </header>
      <main className="mt-6">
        <section id="book-list" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Buku</h2>
          <table className="min-w-full text-left bg-gray-800 shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Author</th>
                <th className="p-2">Category</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => (window.location.href = `/book/${book.id}`)} // Navigasi manual
                  className="cursor-pointer hover:bg-gray-900"
                >
                  <td className=" px-3 py-2">{book.title}</td>
                  <td className=" px-3 py-2">{book.author}</td>
                  <td className=" px-3 py-2">{book.category}</td>
                  <td className=" px-3 py-2">{book.stock}</td>
                  <td className=" px-3 py-2">
                    <button
                      onClick={() => {
                        e.stopPropagation();
                        handleDelete(book.id);
                      }}
                      className="bg-red-600  px-3 py-2 rounded-md mr-2"
                    >
                      Delete
                    </button>
                    <button className="bg-yellow-600 p-2 rounded-md">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="transaction-list" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
          <table className="min-w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">ID Buku</th>
                <th className="py-2 px-4">Nama Peminjam</th>
                <th className="py-2 px-4">Tanggal Pinjam</th>
                <th className="py-2 px-4">Tanggal Kembali</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>{/* Data transaksi akan dimuat di sini */}</tbody>
          </table>
        </section>
        <section id="add-book" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
          <form
            id="add-book-form"
            className="bg-gray-800 p-4 rounded-md shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-300">
                Judul:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-300">
                Penulis:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-300">
                Kategori:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stock" className="block text-gray-300">
                Stok:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Tambah Buku
            </button>
          </form>
        </section>
        <section id="add-transaction" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
          <form
            id="add-transaction-form"
            className="bg-gray-800 p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label htmlFor="book_id" className="block text-gray-300">
                ID Buku:
              </label>
              <input
                type="number"
                id="book_id"
                name="book_id"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrower_name" className="block text-gray-300">
                Nama Peminjam:
              </label>
              <input
                type="text"
                id="borrower_name"
                name="borrower_name"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrow_date" className="block text-gray-300">
                Tanggal Pinjam:
              </label>
              <input
                type="date"
                id="borrow_date"
                name="borrow_date"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="return_date" className="block text-gray-300">
                Tanggal Kembali:
              </label>
              <input
                type="date"
                id="return_date"
                name="return_date"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Tambah Transaksi
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
