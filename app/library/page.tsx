// O caminho para o BookCard está certo!
import { BookCard } from "../../components/BookCard";
// O caminho para os 'books' também precisa subir dois níveis e passar por 'components'
import { books } from "../../components/data/books";

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
  );
}