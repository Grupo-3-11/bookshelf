"use client"

import { use } from "react"
import { books } from "@/app/data/books"
import { notFound } from "next/navigation"
import Link from "next/link"

type Props = {
  params: Promise<{ id: string }>
}

export default function BookDetailsPage({ params }: Props) {
  const { id } = use(params)
  const book = books.find((b) => b.id === id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Botão fixo no canto superior esquerdo */}
      <div className="fixed top-15 left-4 z-50">
        <Link href="/library">
          <button className="flex items-center gap-1 text-md text-blue-800 hover:underline">
            ← Voltar
          </button>
        </Link>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-16">
        {/* Capa + infos principais */}
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

            {/* Estrelas */}
            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < (book.rating || 0) ? "text-yellow-500" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sinopse */}
        {book.synopsis && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Sinopse</h3>
            <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
          </div>
        )}

        {/* Ações */}
        <div className="mt-6 flex gap-3">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
            Editar
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
