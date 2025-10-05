"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookResponse } from "@/app/types/book"

export default function CategoriesPage() {
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch("/api/genres")
      const data = await res.json()
      setGenres(data)
    }

    fetchGenres()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Categorias</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Clique em um gênero para ver os livros relacionados.
      </p>

      <ul className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              href={`/library?genre=${encodeURIComponent(genre.name)}`}
              className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-4 py-2 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
