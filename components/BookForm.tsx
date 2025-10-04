"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function BookForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [status, setStatus] = useState("QUERO_LER")
  const [genre, setGenre] = useState("Não definido")
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const newBook = {
      title,
      author,
      pages: Number(pages) || 0,
      cover: coverUrl,
      status,
      genre,
      year: new Date().getFullYear(),
      rating,
      synopsis: notes,
    }

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })

    if (!res.ok) {
      alert("Erro ao salvar livro")
      return
    }

    alert("Livro adicionado com sucesso!")
    router.push("/dashboard")
  }

  return (
    <form
      onSubmit={handleSubmit}
<<<<<<< HEAD
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Livro</h1>
=======
      className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Adicionar Novo Livro
      </h1>
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c

      {coverUrl && (
        <div className="mb-4 text-center">
          <img
            src={coverUrl}
            alt="Pré-visualização da capa"
            className="max-w-xs mx-auto h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Título */}
      <div className="mb-4">
<<<<<<< HEAD
        <label htmlFor="titulo" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
        <label htmlFor="titulo" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Autor */}
      <div className="mb-6">
<<<<<<< HEAD
        <label htmlFor="autor" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
        <label htmlFor="autor" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          Autor:
        </label>
        <input
          type="text"
          id="autor"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Páginas */}
      <div className="mb-4">
<<<<<<< HEAD
        <label htmlFor="paginas" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
        <label htmlFor="paginas" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          Total de Páginas:
        </label>
        <input
          type="number"
          id="paginas"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

<<<<<<< HEAD
      {/* Capa */}
      <div className="mb-6">
        <label htmlFor="capa" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
      {/* URL da Capa */}
      <div className="mb-6">
        <label htmlFor="capa" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          URL da Capa:
        </label>
        <input
          type="url"
          id="capa"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

<<<<<<< HEAD
      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
      {/* Status de Leitura */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          Status de Leitura:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
<<<<<<< HEAD
          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700"
=======
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        >
          <option value="QUERO_LER">Quero Ler</option>
          <option value="LENDO">Lendo</option>
          <option value="LIDO">Lido</option>
          <option value="PAUSADO">Pausado</option>
          <option value="ABANDONADO">Abandonado</option>
        </select>
      </div>

      {/* Gênero */}
      <div className="mb-4">
<<<<<<< HEAD
        <label htmlFor="genre" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
=======
        <label htmlFor="genre" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          Gênero:
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
<<<<<<< HEAD
          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700"
=======
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        >
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
      </div>

<<<<<<< HEAD
      {/* Rating */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Avaliação:
        </label>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer text-2xl ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Notas */}
      <div className="mb-6">
        <label htmlFor="notas" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Notas Pessoais:
=======
      {/* Avaliação */}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Avaliação (0 a 5):
        </label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Sinopse */}
      <div className="mb-6">
        <label htmlFor="notas" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Sinopse
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        </label>
        <textarea
          id="notas"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Adicionar Livro
      </button>
    </form>
  )
}
