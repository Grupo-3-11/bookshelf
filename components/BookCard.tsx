"use client"

import Link from "next/link"
import { Book } from "@/app/types/book"

type Props = { 
  book: Book
  onDelete?: (id: string) => void  // Torna opcional
}

export function BookCard({ book, onDelete }: Props) {
  function handleDelete() {
    if (!confirm("Confirma exclusão deste livro?")) return
    if (onDelete) {
      onDelete(book.id)
    } else {
      // Fallback caso onDelete não seja fornecido
      console.warn("Função onDelete não fornecida")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      <img src={book.cover || "/fallback-cover.jpg"} alt={book.title} className="w-full h-60 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">por {book.author}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium">{book.category}</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{book.rating}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link 
            href={`/books/${book.id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors"
          >
            Visualizar
          </Link>
          <Link 
            href={`/edit-book/${book.id}`}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 px-4 rounded transition-colors"
          >
            Editar
          </Link>
          {/* Só mostra o botão Excluir se onDelete for fornecido */}
          {onDelete && (
            <button 
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}