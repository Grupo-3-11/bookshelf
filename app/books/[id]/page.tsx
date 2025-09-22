"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getBookById, deleteBookById } from "@/lib/storage"
import { Book } from "@/app/types/book"

type Props = { params: { id: string } }

export default function BookDetailsPage({ params }: Props) {
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    const b = getBookById(params.id)
    if (b) {
      setBook(b)
    }
  }, [params.id])

  if (!book) {
    return <p className="text-center mt-10">Livro não encontrado.</p>
  }

  function handleDelete() {
    if (!book) return
    if (!confirm("Confirma exclusão deste livro?")) return
    deleteBookById(book.id)
    router.push("/library")
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/library">
          <button className="flex items-center gap-1 text-md text-blue-800 hover:underline">
            ← Voltar
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.cover || "/fallback-cover.jpg"}
            alt={book.title}
            className="w-40 h-60 object-cover rounded"
          />
          <div>
            <h2 className="text-3xl font-bold">{book.title}</h2>
            <p className="text-lg text-gray-700">Autor: {book.author}</p>
            {book.year && <p className="text-gray-600">Ano: {book.year}</p>}
            {book.genre && (
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                {book.genre}
              </span>
            )}

            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < (book.rating || 0) ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {book.synopsis && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Sinopse</h3>
            <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Link
            href={`/edit-book/${book.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
