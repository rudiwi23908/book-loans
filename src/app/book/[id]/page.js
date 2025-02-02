async function fetchBookDetails(id) {
  try {
    const response = await fetch(`http://localhost:3001/api/book/${id}`);

    if (!response.ok) {
      throw new Error("Book not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch book details:", error);
    return null;
  }
}

export default async function BookDetail({ params }) {
  const { id } = await params;
  const book = await fetchBookDetails(id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Book not found or an error occurred.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

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
          <p>Created At: {formatDate(book.created_at)}</p>
          <p>Updated At: {formatDate(book.updated_at)}</p>
        </div>
      </main>
    </div>
  );
}
