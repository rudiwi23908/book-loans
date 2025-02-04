import React from "react";

export const TransactionList = ({ transactions }) => {
  return (
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
            <td>{new Date(transaction.borrow_date).toLocaleString("id-ID")}</td>
            <td>{new Date(transaction.return_date).toLocaleString("id-ID")}</td>
            <td>
              {new Date(transaction.actual_return_date).toLocaleString("id-ID")}
            </td>
            <td>{transaction.status}</td>
            <td>edit | hapus</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
