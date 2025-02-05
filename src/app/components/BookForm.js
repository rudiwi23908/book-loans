"use client";
import React, { useState } from "react";

export const BookForm = () => {
  const [formDataBook, setFormDataBook] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
  });

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataBook),
      });
      if (!res.ok) {
        throw new Error("Failed to create book");
      }
      const newBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setFormDataBook({
        title: "",
        author: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.log(formDataBook);
      console.error("Error:", error);
    }
  };

  const handleChangeBook = (e) => {
    const { name, value } = e.target;
    setFormDataBook({
      ...formDataBook,
      [name]: value,
    });
  };
  return (
    <form
      id="add-book-form"
      className="bg-gray-800 p-4 rounded-md shadow-md"
      onSubmit={handleSubmitBook}
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
          value={formDataBook.title}
          onChange={onChangeBook}
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
          value={formDataBook.author}
          onChange={onChangeBook}
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
          value={formDataBook.category}
          onChange={onChangeBook}
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
          value={formDataBook.stock}
          onChange={onChangeBook}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Tambah Buku
      </button>
    </form>
  );
};
