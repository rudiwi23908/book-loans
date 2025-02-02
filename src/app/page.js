"use client";

import { stringify } from "postcss";
import React, { useState, useEffect } from "react";
import { BookList } from "./components/BookList";

// import { useRouter } from "next/router";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({}); // Menyimpan data yang diubah
  const [loading, setLoading] = useState(true);

  const [formDataBook, setFormDataBook] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
  });
  const [formDataTransaction, setFormDataTransaction] = useState({
    book_id: "",
    title: "",
    borrower_name: "",
    borrow_date: "",
    return_date: "",
    actual_return_date: "",
    status: "borrowed", // default status
  });

  const [searchTerm, setSearchTerm] = useState(""); // Untuk input pencarian
  const [filteredBooks, setFilteredBooks] = useState([]); // Menyimpan hasil pencarian buku

  const handleInputChangeTransaction = (e) => {
    const { name, value } = e.target;
    setFormDataTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fungsi untuk mencari buku berdasarkan judul
  const searchBooks = async (title) => {
    if (!title) {
      setFilteredBooks([]); // Kosongkan hasil jika input kosong
      return;
    }

    try {
      const res = await fetch(`/api/book/search?title=${title}`);
      if (!res.ok) throw new Error("Failed to fetch books");

      const data = await res.json();
      setFilteredBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleSubmitTransaction = async (e) => {
    e.preventDefault();

    console.log("Payload being sent:", formDataTransaction);

    try {
      const res = await fetch("/api/transaction/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formDataTransaction),
      });

      if (!res.ok) throw new Error("Failed to create transaction");

      const newTrasaction = await res.json();
      setTransactions((prevTrasactions) => [...prevTrasactions, newTrasaction]);
      setFormDataTransaction({
        book_id: "",
        title: "",
        borrower_name: "",
        borrow_date: "",
        return_date: "",
        actual_return_date: "",
        status: "borrowed",
      });
    } catch (error) {
      console.error("Error creating transaction", error);
    }
  };

  // Fungsi untuk menghandle perubahan input pencarian
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Panggil fungsi pencarian saat input berubah
    searchBooks(value);
  };

  // Fungsi untuk memilih buku dari hasil pencarian
  const handleSelectBook = (book) => {
    setFormDataTransaction((prev) => ({
      ...prev,
      book_id: book.id, // Set ID buku yang dipilih
      title: book.title, // Mengisi form dengan judul buku yang dipilih
    }));
    setSearchTerm(""); // Menghapus input pencarian setelah memilih buku
    setFilteredBooks([]); // Mengosongkan hasil pencarian
  };

  // const router = useRouter();

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaction/read");
        console.log("useeffect untuk transaction");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleChangeBook = (e) => {
    const { name, value } = e.target;
    setFormDataBook({
      ...formDataBook,
      [name]: value,
    });
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="bg-blue-800 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Aplikasi Peminjaman Buku</h1>
      </header>
      <main className="mt-6">
        <BookList />
        <section id="transaction-list" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
          <table className="min-w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">ID Buku</th>
                <th className="py-2 px-4">Nama Peminjam</th>
                <th className="py-2 px-4">Tanggal Pinjam</th>
                <th className="py-2 px-4">Tanggal Pengembalian</th>
                <th className="py-2 px-4">Tanggal Dikembalikan</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.book_id}</td>
                  <td>{transaction.borrower_name}</td>
                  <td>
                    {new Date(transaction.borrow_date).toLocaleString("id-ID")}
                  </td>
                  <td>
                    {new Date(transaction.return_date).toLocaleString("id-ID")}
                  </td>
                  <td>
                    {new Date(transaction.actual_return_date).toLocaleString(
                      "id-ID"
                    )}
                  </td>
                  <td>{transaction.status}</td>
                  <td>edit | hapus</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="add-book" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
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
                onChange={handleChangeBook}
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
                onChange={handleChangeBook}
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
                onChange={handleChangeBook}
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
                onChange={handleChangeBook}
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
            onSubmit={handleSubmitTransaction}
          >
            <div className="mb-4">
              <label htmlFor="book_title" className="block text-gray-300">
                Judul Buku
              </label>
              <input
                type="text"
                id="book_title"
                name="book_title"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                onChange={handleSearchChange} // Update pencarian buku
                value={searchTerm || formDataTransaction.title}
              />
              {filteredBooks.length > 0 ? (
                <ul className="bg-gray-700 mt-2 p-2 rounded-md max-h-40 overflow-y-auto">
                  {filteredBooks.map((book) => (
                    <li
                      key={book.id}
                      className="cursor-pointer p-2 hover:bg-gray-600"
                      onClick={() => handleSelectBook(book)} // Memilih buku dari hasil pencarian
                    >
                      {book.title}
                    </li>
                  ))}
                </ul>
              ) : searchTerm && !filteredBooks.length ? (
                <div className="bg-gray-700 mt-2 p-2 rounded-md">
                  <span>Tidak ada hasil ditemukan</span>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="borrower_name" className="block text-gray-300">
                Nama Peminjam:
              </label>
              <input
                type="text"
                onChange={handleInputChangeTransaction}
                id="borrower_name"
                name="borrower_name"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formDataTransaction.borrower_name}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrow_date" className="block text-gray-300">
                Tanggal Pinjam:
              </label>
              <input
                type="date"
                id="borrow_date"
                onChange={handleInputChangeTransaction}
                name="borrow_date"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formDataTransaction.borrow_date}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="return_date" className="block text-gray-300">
                Tanggal Pengembalian:
              </label>
              <input
                type="date"
                id="actual_return_date"
                onChange={handleInputChangeTransaction}
                name="actual_return_date"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formDataTransaction.actual_return_date}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="return_date" className="block text-gray-300">
                Tanggal Kembali:
              </label>
              <input
                type="date"
                id="return_date"
                onChange={handleInputChangeTransaction}
                name="return_date"
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                value={formDataTransaction.return_date}
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
