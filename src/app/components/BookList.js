"use client";
import React, { useState, useEffect } from "react";
export const BookList = () => {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null); // Menyimpan ID buku yang sedang diedit
  const [updatedData, setUpdatedData] = useState({}); // Menyimpan data yang diubah
  const [formDataBook, setFormDataBook] = useState({
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
      }
    };

    fetchBooks();
  }, []);

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

  const handleEditClick = (book) => {
    setEditingBookId(book.id);
    setUpdatedData(book); // Mengisi form dengan data buku yang akan diedit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value, // Konversi stock ke number
    }));
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/book/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedData }),
      });

      if (!res.ok) throw new Error("Failed to update book");

      const updatedBook = await res.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? updatedBook : book))
      );
      setEditingBookId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        console.log("Memulai proses penghapusan untuk ID:", id); // Debug ID sebelum menghapus
        console.log("Body yang dikirim:", JSON.stringify({ id })); // Debug body request

        const res = await fetch(`/api/book/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        console.log("Respons fetch:", res); // Log respons fetch

        if (!res.ok) {
          const errorData = await res.json(); // Jika error, log error detail
          console.error("Error detail dari server:", errorData);
          throw new Error("Failed to delete book");
        }

        const deletedBook = await res.json(); // Jika sukses, log data buku yang dihapus
        console.log("Buku berhasil dihapus:", deletedBook);

        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        console.log("State buku diperbarui.");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    } else {
      console.log("Penghapusan dibatalkan oleh pengguna."); // Log jika pengguna membatalkan
    }
  };

  return (
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
            // onClick={() => router.push(`/book/${book.id}`)}
            className="cursor-pointer hover:bg-gray-900"
          >
            <td className=" px-3 py-2">
              {editingBookId === book.id ? (
                <input
                  type="text"
                  name="title"
                  value={updatedData.title || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                />
              ) : (
                book.title
              )}
            </td>
            <td className=" px-3 py-2">
              {editingBookId === book.id ? (
                <input
                  type="text"
                  name="author"
                  value={updatedData.author || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                />
              ) : (
                book.author
              )}
            </td>
            <td className=" px-3 py-2">
              {" "}
              {editingBookId === book.id ? (
                <input
                  type="text"
                  name="category"
                  value={updatedData.category || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                />
              ) : (
                book.category
              )}
            </td>
            <td className=" px-3 py-2">
              {" "}
              {editingBookId === book.id ? (
                <input
                  type="number"
                  name="stock"
                  value={updatedData.stock || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                />
              ) : (
                book.stock
              )}
            </td>
            <td className=" px-3 py-2">
              {editingBookId === book.id ? (
                <>
                  <button
                    onClick={() => handleSave(book.id)}
                    className="bg-green-600 px-3 py-2 rounded-md mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBookId(null)}
                    className="bg-red-600 px-3 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleEditClick(book);
                    }}
                    className="bg-yellow-600 px-3 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-600 px-3 py-2 rounded-md"
                  >
                    Hapus
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
