import React from "react";

export const TransactionForm = () => {
  return (
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
  );
};
