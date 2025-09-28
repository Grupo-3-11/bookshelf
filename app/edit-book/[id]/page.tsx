"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Book } from "@/app/types/book"
import { getBookById, updateBook } from "@/lib/storage"

type Props = { params: { id: string } }

export default function EditBookPage({ params }: Props) {
  const router = useRouter()
  const [formData, setFormData] = useState<Book | null>(null)

  useEffect(() => {
    const book = getBookById(params.id)
    if (book) setFormData(book)
  }, [params.id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return
    updateBook({
      ...formData,
      year: Number(formData.year) || undefined,
      pages: Number(formData.pages) || undefined,
      rating: Number(formData.rating) || 0,
    })
    alert("Livro atualizado com sucesso!")
    router.push("/library")
  }

  if (!formData)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Carregando...
      </p>
    )

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Editar Livro
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-gray-700 dark:text-gray-200">
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Autor:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Ano:
          <input
            type="number"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Páginas:
          <input
            type="number"
            name="pages"
            value={formData.pages || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Gênero:
          <select
            name="genre"
            value={formData.genre || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Selecione</option>
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
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Avaliação:
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            value={formData.rating || 0}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Sinopse:
          <textarea
            name="synopsis"
            value={formData.synopsis || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-colors"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
