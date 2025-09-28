"use client"

import { useEffect, useState } from "react"
import { StatsCard } from "@/components/StatsCard"
import { BookCard } from "@/components/BookCard"
import { Book } from "@/app/types/book"
import { getAllBooks } from "@/lib/storage"

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setBooks(getAllBooks())
  }, [])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatsCard title="Total de Livros" value={books.length} />
          <StatsCard title="Quero Ler" value={books.filter(b => b.status === 'QUERO_LER').length} />
          <StatsCard title="Lendo" value={books.filter(b => b.status === 'LENDO').length} />
          <StatsCard title="Lidos" value={books.filter(b => b.status === 'LIDO').length} />
          <StatsCard title="Páginas Lidas" value={books.reduce((s, b) => s + (b.pages || 0), 0)} />
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-white">
            Biblioteca
          </h2>
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full md:w-80 p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}
