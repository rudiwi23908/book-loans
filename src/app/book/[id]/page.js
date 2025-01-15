export default async function BookDetail({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/book/${id}`, {
    cache: "no-store", // Hindari cache untuk data dinamis
  });

  if (!res.ok) {
    return <p>Book not found</p>;
  }
  const book = await res.json();

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="bg-blue-800 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">{book.title}</h1>
      </header>
      <main className="mt-4">
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Author: {book.author}</h2>
          <p>Category: {book.category}</p>
          <p>Stock: {book.stock}</p>
          <p>Description: {book.description}</p>
          <p>Created At: {new Date(book.created_at).toLocaleDateString()}</p>
          <p>Updated At: {new Date(book.updated_at).toLocaleDateString()}</p>
        </div>
      </main>
    </div>
  );
}
