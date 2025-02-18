import React from "react";

export const BookForm = () => {
  return (
    <form
      id="add-book-form"
      className="p-4 bg-gray-800 rounded-md shadow-md"
      // onSubmit={onSubmitBook}
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
          className="w-full p-2 text-white bg-gray-900 border border-gray-600 rounded-md"
          // value={formDataBook.title}
          // onChange={onChangeBook}
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
          className="w-full p-2 text-white bg-gray-900 border border-gray-600 rounded-md "
          // value={formDataBook.author}
          // onChange={onChangeBook}
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
          // value={formDataBook.category}
          // onChange={onChangeBook}
          className="w-full p-2 text-white bg-gray-900 border border-gray-600 rounded-md"
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
          className="w-full p-2 text-white bg-gray-900 border border-gray-600 rounded-md"
          // value={formDataBook.stock}
          // onChange={onChangeBook}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-md"
      >
        Tambah Buku
      </button>
    </form>
  );
};
