"use client";

import { stringify } from "postcss";
import React, { useState, useEffect } from "react";
import { BookList } from "./components/BookList";
import { TransactionList } from "./components/TransactionList";
import { BookForm } from "./components/BookForm";
import { TransactionForm } from "./components/TransactionForm";

// import { useRouter } from "next/router";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [transactionError, setTransactionError] = useState(null);
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
    setTransactionError(null);
    try {
      const res = await fetch("//transaction/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formDataTransaction),
      });

      if (!res.ok) throw new Error("gagal menambahkan transaksi");

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
      setTransactionError(error.message);
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
        <section id="book-list" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Buku</h2>
          <BookList books={books} setBooks={setBooks} />
        </section>
        <section id="transaction-list" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
          <TransactionList transactions={transactions} />
        </section>
        <section id="add-book" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
          <BookForm
            onSubmitBook={handleSubmitBook}
            onChangeBook={handleChangeBook}
            formDataBook={formDataBook}
          />
        </section>
        <section id="add-transaction" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
          <TransactionForm
            onSubmitTransaction={handleSubmitTransaction}
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            formDataTransaction={formDataTransaction}
            filteredBooks={filteredBooks}
            onInputChangeTransaction={handleInputChangeTransaction}
            onSelectBook={handleSelectBook}
            transactionError={transactionError}
          />
        </section>
      </main>
    </div>
  );
}
