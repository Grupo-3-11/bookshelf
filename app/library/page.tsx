"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Book } from "@/app/types/book"
import { BookCardDashboard } from "@/components/BookCardDashboard"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
<<<<<<< HEAD
  const [search, setSearch] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [sortOption, setSortOption] = useState("")

  const searchParams = useSearchParams()
  const genreFromURL = searchParams.get("genre") || ""
=======
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("title")
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books")
      const data = await res.json()
      setBooks(data)
    }
    fetchBooks()
  }, [])

<<<<<<< HEAD
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
=======
  // 🔍 Filtro e ordenação
  let filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "" || book.genre === selectedGenre
    const matchesStatus = selectedStatus === "" || book.status === selectedStatus
    const matchesRating = Number(book.rating) >= minRating
    return matchesSearch && matchesGenre && matchesStatus && matchesRating
  })

  filteredBooks = filteredBooks.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title)
    if (sortBy === "year") return (b.year || 0) - (a.year || 0)
    return 0
  })

  // 🧩 Agrupamento por gênero
  const groupedByGenre = filteredBooks.reduce((acc, book) => {
    const key = book.genre || "Não definido"
    acc[key] = acc[key] || []
    acc[key].push(book)
    return acc
  }, {} as Record<string, Book[]>)

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
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Filtrar por gênero</option>
          <option value="Literatura Brasileira">Literatura Brasileira</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Realismo Mágico">Realismo Mágico</option>
          <option value="Ficção">Ficção</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Romance">Romance</option>
          <option value="Biografia">Biografia</option>
          <option value="História">História</option>
          <option value="Autoajuda">Autoajuda</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Programação">Programação</option>
          <option value="Negócios">Negócios</option>
          <option value="Psicologia">Psicologia</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Poesia">Poesia</option>
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
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
      </div>

      {/* 📢 Mensagem global se nenhum livro for encontrado */}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          Nenhum livro encontrado com os filtros selecionados.
        </p>
      )}

      {/* 📚 Renderização por gênero com fallback por seção */}
      {Object.entries(groupedByGenre).map(([genre, books]) => (
        <div key={genre} className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{genre}</h3>

          {books.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum livro neste gênero com os filtros aplicados.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
