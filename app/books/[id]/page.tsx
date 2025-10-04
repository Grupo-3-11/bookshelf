"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Book } from "@/app/types/book"

type Props = { params: Promise<{ id: string }> }

export default function BookDetailsPage({ params }: Props) {
  const { id } = use(params)
  const [book, setBook] = useState<Book | null>(null)
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

<<<<<<< HEAD
    fetchBook()
  }, [id])
=======
  if (!book) {
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Livro não encontrado.
      </p>
    )
  }
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c

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
<<<<<<< HEAD
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/library">
          <button className="flex items-center gap-1 text-md text-blue-800 dark:text-blue-300 hover:underline">
=======
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/library">
          <button className="flex items-center gap-1 text-md text-blue-800 dark:text-blue-400 hover:underline">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
            ← Voltar
          </button>
        </Link>
      </div>

<<<<<<< HEAD
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-16">
=======
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-16 text-gray-900 dark:text-white">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.cover || "/fallback-cover.jpg"}
            alt={book.title}
            className="w-40 h-60 object-cover rounded shadow"
          />
          <div>
            <h2 className="text-3xl font-bold">{book.title}</h2>
<<<<<<< HEAD
            <p className="text-lg text-gray-700 dark:text-gray-300">Autor: {book.author}</p>
            {book.year && <p className="text-gray-600 dark:text-gray-400">Ano: {book.year}</p>}
=======
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Autor: {book.author}
            </p>
            {book.year && (
              <p className="text-gray-600 dark:text-gray-400">Ano: {book.year}</p>
            )}
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
            {book.genre && (
              <span className="inline-block mt-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
                {book.genre}
              </span>
            )}
            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
<<<<<<< HEAD
                  className={i < (book.rating || 0) ? "text-yellow-500" : "text-gray-300"}
=======
                  className={
                    i < (book.rating || 0)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
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
<<<<<<< HEAD
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{book.synopsis}</p>
=======
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {book.synopsis}
            </p>
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          </div>
        )}

        <div className="mt-6 flex gap-3">
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
