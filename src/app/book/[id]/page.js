async function fetchBookDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/book/${id}`, {
      cache: "no-store", // Hindari cache untuk data dinamis
    });

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

  const {
    title,
    author,
    category,
    stock,
    description,
    created_at,
    updated_at,
  } = book;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="bg-blue-800 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>
      <main className="mt-4">
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Author: {author}</h2>
          <p>Category: {category}</p>
          <p>Stock: {stock}</p>
          <p>Description: {description}</p>
          <p>Created At: {new Date(created_at).toLocaleDateString()}</p>
          <p>Updated At: {new Date(updated_at).toLocaleDateString()}</p>
        </div>
      </main>
    </div>
  );
}
