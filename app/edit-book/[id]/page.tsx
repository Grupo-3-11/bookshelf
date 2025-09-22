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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return
    updateBook({ ...formData, year: Number(formData.year) || undefined, pages: Number(formData.pages) || undefined, rating: Number(formData.rating) || 0 })
    alert("Livro atualizado com sucesso!")
    router.push("/library")
  }

  if (!formData) return <p className="text-center mt-10">Carregando...</p>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Livro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <label>
          Autor:
          <input type="text" name="author" value={formData.author} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <label>
          Ano:
          <input type="number" name="year" value={formData.year || ""} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <label>
          Páginas:
          <input type="number" name="pages" value={formData.pages || ""} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <label>
          Gênero:
          <select name="genre" value={formData.genre || ""} onChange={handleChange} className="border p-2 rounded w-full">
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

        <label>
          Avaliação:
          <input type="number" name="rating" min="0" max="5" value={formData.rating || 0} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <label>
          Sinopse:
          <textarea name="synopsis" value={formData.synopsis || ""} onChange={handleChange} className="border p-2 rounded w-full" />
        </label>

        <button type="submit" className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
