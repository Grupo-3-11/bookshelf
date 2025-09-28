"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Book } from "@/app/types/book"
import { deleteBookById } from "@/lib/storage"

type Props = { book: Book }

export function BookCard({ book }: Props) {
  const router = useRouter()

  function handleDelete() {
    if (!confirm("Confirma exclusão deste livro?")) return
    deleteBookById(book.id)
    router.push("/library")
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
  <img src={book.cover || "/fallback-cover.jpg"} alt={book.title} className="w-full h-60 object-cover" />

  <div className="p-4 flex flex-col flex-1">
    <h3 className="text-lg font-bold">{book.title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{book.author}</p>
    {book.year && <p className="text-sm text-gray-500 dark:text-gray-400">Ano: {book.year}</p>}
    {book.genre && (
      <span className="inline-block mt-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
        {book.genre}
      </span>
    )}

    <div className="mt-2 flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < (book.rating || 0) ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}>★</span>
      ))}
    </div>

    <div className="mt-4 flex gap-2">
      <Link href={`/books/${book.id}`} className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded transition">Visualizar</Link>
      <Link href={`/edit-book/${book.id}`} className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 rounded transition">Editar</Link>
      <button onClick={handleDelete} className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded transition">Excluir</button>
    </div>
  </div>
</div>
  )
}
