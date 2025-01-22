"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book/read");
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

  const handleEditClick = (book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      stock: book.stock,
    });
  };

  const handleSaveClick = async (bookId) => {
    try {
      const res = await fetch(`/api/book/update/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update book");
      const updatedBook = await res.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
      );
      setEditingBookId(null);
      setFormData({
        title: "",
        author: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                <tr key={book.id} className="hover:bg-gray-900">
                  <td className="px-3 py-2">
                    {editingBookId === book.id ? (
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingBookId === book.id ? (
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
                      />
                    ) : (
                      book.author
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingBookId === book.id ? (
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
                      />
                    ) : (
                      book.category
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingBookId === book.id ? (
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
                      />
                    ) : (
                      book.stock
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingBookId === book.id ? (
                      <button
                        onClick={() => handleSaveClick(book.id)}
                        className="bg-green-600 px-3 py-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(book)}
                        className="bg-yellow-600 px-3 py-2 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
