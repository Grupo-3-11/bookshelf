"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Book } from "@/app/types/book"

export default function CategoriesPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books")
      const data = await res.json()
      setBooks(data)

      const uniqueGenres = Array.from(
        new Set(data.map((book: Book) => book.genre).filter(Boolean))
      )
      setGenres(uniqueGenres)
    }

    fetchBooks()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Categorias</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Clique em um gênero para ver os livros relacionados.
      </p>

      <ul className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <li key={genre}>
<Link
  href={`/library?genre=${encodeURIComponent(genre)}`}
  className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-4 py-2 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition"
>
  {genre}
</Link>

          </li>
        ))}
      </ul>
    </div>
  )
}
