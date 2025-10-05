"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookResponse } from "@/app/types/book"

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [book, setBook] = useState<BookResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${id}`)
        if (!res.ok) throw new Error("Erro ao buscar livro")
        const data = await res.json()
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  async function handleDelete() {
    if (!confirm("Confirma exclusão deste livro?")) return
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erro ao excluir livro")
      router.push("/library")
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>
  if (!book) return <p className="text-center mt-10">Livro não encontrado.</p>

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* 🔙 Botão Voltar */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/library">
          <button className="flex items-center gap-1 text-md text-blue-800 dark:text-blue-300 hover:underline">
            ← Voltar
          </button>
        </Link>
      </div>

      {/* 📖 Card do Livro */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-16 text-gray-900 dark:text-white space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.cover || "/fallback-cover.jpg"}
            alt={book.title}
            className="w-40 h-60 object-cover rounded shadow"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-bold">{book.title}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Autor: {book.author}</p>
            {book.year && <p className="text-gray-600 dark:text-gray-400">Ano: {book.year}</p>}
            {book.genre?.name && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
                {book.genre.name}
              </span>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">Status: {book.status.replace("_", " ")}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Página atual: {book.currentPage}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">ISBN: {book.isbn}</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < (book.rating || 0)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 📜 Sinopse */}
        {book.synopsis && (
          <div>
            <h3 className="text-xl font-semibold mb-1">Sinopse</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{book.synopsis}</p>
          </div>
        )}

        {/* 📝 Notas Pessoais */}
        {book.notes && (
          <div>
            <h3 className="text-xl font-semibold mb-1">Notas Pessoais</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{book.notes}</p>
          </div>
        )}

        {/* ✏️ Botões */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/edit-book/${book.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
