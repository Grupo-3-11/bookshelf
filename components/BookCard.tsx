"use client"

import Link from "next/link"
import { Book } from "../app/types/book"

type Props = {
  book: Book
}

export function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Capa do livro */}
      <img
        src={book.cover || "/fallback-cover.jpg"}
        alt={book.title}
        className="w-full h-60 object-cover"
      />

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        {book.year && (
          <p className="text-sm text-gray-500">Ano: {book.year}</p>
        )}
        {book.genre && (
          <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            {book.genre}
          </span>
        )}

        {/* Avaliação por estrelas */}
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

        {/* Botões de ação */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/books/${book.id}`}
            className="flex-1 text-center bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600 transition"
          >
            Visualizar
          </Link>
          <Link
            href={`/edit-book/${book.id}`}
            className="flex-1 text-center bg-yellow-500 text-white text-sm py-1 rounded hover:bg-yellow-600 transition"
          >
            Editar
          </Link>
          <button
            className="flex-1 text-center bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition"
            onClick={() => alert("Excluir ainda não implementado")}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
