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
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Livro</h1>

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
        <label htmlFor="titulo" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Autor */}
      <div className="mb-6">
        <label htmlFor="autor" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Autor:
        </label>
        <input
          type="text"
          id="autor"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Páginas */}
      <div className="mb-4">
        <label htmlFor="paginas" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Total de Páginas:
        </label>
        <input
          type="number"
          id="paginas"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Capa */}
      <div className="mb-6">
        <label htmlFor="capa" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          URL da Capa:
        </label>
        <input
          type="url"
          id="capa"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Status de Leitura:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700"
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
        <label htmlFor="genre" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Gênero:
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700"
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
        </label>
        <textarea
          id="notas"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Adicionar Livro
      </button>
    </form>
  )
}
