"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Book } from "@/app/types/book"
import { BookCardDashboard } from "@/components/BookCardDashboard"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [sortOption, setSortOption] = useState("")

  const searchParams = useSearchParams()
  const genreFromURL = searchParams.get("genre") || ""

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books")
      const data = await res.json()
      setBooks(data)
    }
    fetchBooks()
  }, [])

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())

    const matchesGenre = genreFilter
      ? book.genre === genreFilter
      : genreFromURL
      ? book.genre === genreFromURL
      : true

    const matchesStatus = statusFilter ? book.status === statusFilter : true
    const matchesRating = ratingFilter ? book.rating >= Number(ratingFilter) : true

    return matchesSearch && matchesGenre && matchesStatus && matchesRating
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        return b.year - a.year
      case "oldest":
        return a.year - b.year
      case "best":
        return b.rating - a.rating
      case "worst":
        return a.rating - b.rating
      default:
        return 0
    }
  })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Minha Biblioteca</h1>

      {/* 🔍 Filtros e ordenação */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou autor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />

        <select
          value={genreFilter || genreFromURL}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border p-2 rounded bg-dark dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2">

          <option value="">Todos os gêneros</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Romance">Romance</option>
          <option value="Programação">Programação</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Filosofia">Filosofia</option>
          {/* Adicione mais gêneros conforme necessário */}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded bg-dark dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2">
          <option value="">Todos os status</option>
          <option value="LIDO">LIDO</option>
          <option value="LENDO">LENDO</option>
          <option value="QUERO_LER">QUERO LER</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="border p-2 rounded bg-dark dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2">
          <option value="">Todas as notas</option>
          <option value="5">Nota 5+</option>
          <option value="4">Nota 4+</option>
          <option value="3">Nota 3+</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded bg-dark dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2">
          <option value="">Ordenar por...</option>
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="best">Maior nota</option>
          <option value="worst">Menor nota</option>
        </select>
      </div>

      {/* 📚 Lista de livros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBooks.map((book) => (
          <BookCardDashboard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
