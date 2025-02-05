import React from "react";

export const BookForm = () => {
  return (
    <form
      id="add-book-form"
      className="bg-gray-800 p-4 rounded-md shadow-md"
      onSubmit={onSubmitBook}
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
