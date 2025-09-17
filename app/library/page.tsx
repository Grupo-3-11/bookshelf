import { BookCard } from "../../components/BookCard"
import { books } from "../data/books"

export default function LibraryPage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Biblioteca</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
