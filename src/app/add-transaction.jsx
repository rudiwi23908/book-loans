import React from "react";
import { TransactionForm } from "./components/TransactionForm";

export const addTransaction = () => {
  return (
    <section id="add-transaction" className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
      <TransactionForm />
    </section>
  );
};
