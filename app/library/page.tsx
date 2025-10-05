"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BookResponse } from "@/app/types/book"
import { BookCard } from "@/components/BookCard"

export default function LibraryPage() {
  const [books, setBooks] = useState<BookResponse[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("title")

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

  // 🔍 Filtro + ordenação
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())

        const genreName = book.genre?.name || ""
        const matchesGenre =
          selectedGenre !== ""
            ? genreName === selectedGenre
            : genreFromURL
            ? genreName === genreFromURL
            : true

        const matchesStatus = selectedStatus === "" || book.status === selectedStatus
        const matchesRating = Number(book.rating) >= minRating

        return matchesSearch && matchesGenre && matchesStatus && matchesRating
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title)
        if (sortBy === "year") return (b.year || 0) - (a.year || 0)
        return 0
      })
  }, [books, searchTerm, selectedGenre, selectedStatus, minRating, sortBy, genreFromURL])

  // 🧩 Agrupamento por gênero
  const groupedByGenre = useMemo(() => {
    return filteredBooks.reduce((acc, book) => {
      const key = book.genre?.name || "Não definido"
      acc[key] = acc[key] || []
      acc[key].push(book)
      return acc
    }, {} as Record<string, BookResponse[]>)
  }, [filteredBooks])

  // 🎭 Lista de gêneros (opcional: pode vir do backend)
  const genres = Array.from(
    new Set(books.map((book) => book.genre?.name).filter(Boolean))
  )

  return (
    <div className="container mx-auto py-8 px-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Biblioteca
      </h2>

      {/* 🎛️ Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedGenre || genreFromURL}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Filtrar por gênero</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Filtrar por status</option>
          <option value="QUERO_LER">Quero Ler</option>
          <option value="LENDO">Lendo</option>
          <option value="LIDO">Lido</option>
          <option value="PAUSADO">Pausado</option>
          <option value="ABANDONADO">Abandonado</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="title">Ordenar por título</option>
          <option value="year">Ordenar por ano</option>
        </select>

        {/* ⭐ Estrelas clicáveis */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Avaliação mínima:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(star)}
              className={`text-xl transition ${
                minRating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
              }`}
            >
              ★
            </button>
          ))}
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="text-sm text-blue-500 hover:underline ml-2"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* 📢 Mensagem caso não encontre livros */}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          Nenhum livro encontrado com os filtros selecionados.
        </p>
      )}

      {/* 📚 Renderização agrupada */}
      {Object.entries(groupedByGenre).map(([genre, books]) => (
        <div key={genre} className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{genre}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
