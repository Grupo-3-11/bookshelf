"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookResponse } from "@/app/types/book"

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState<BookResponse | null>(null)
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookRes, genreRes] = await Promise.all([
          fetch(`/api/books/${id}`),
          fetch("/api/genres"),
        ])
        if (!bookRes.ok || !genreRes.ok) throw new Error("Erro ao buscar dados")
        const book = await bookRes.json()
        const genreList = await genreRes.json()
        setFormData(book)
        setGenres(genreList)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  function validateForm(data: BookResponse) {
    const newErrors: { [key: string]: string } = {}
    if (!data.title.trim()) newErrors.title = "O título é obrigatório."
    if (!data.author.trim()) newErrors.author = "O autor é obrigatório."
    if (!data.year || data.year <= 0) newErrors.year = "Ano inválido."
    if (data.rating < 0 || data.rating > 5) newErrors.rating = "Avaliação deve ser entre 0 e 5."
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          genreId: formData.genre?.id || formData.genreId,
          year: Number(formData.year),
          pages: Number(formData.pages),
          currentPage: Number(formData.currentPage),
          rating: Number(formData.rating),
        }),
      })
      if (!res.ok) throw new Error("Erro ao atualizar livro")
      alert("Livro atualizado com sucesso!")
      router.push("/library")
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar alterações.")
    }
  }

  if (loading) return <p className="text-center mt-10 dark:text-gray-100">Carregando...</p>
  if (!formData) return <p className="text-center mt-10 dark:text-gray-100">Livro não encontrado.</p>

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center">Editar Livro</h2>

      {formData.cover && (
        <div className="text-center">
          <img src={formData.cover} alt="Capa" className="max-h-64 mx-auto rounded shadow" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título e Autor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Título</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
          </div>
          <div>
            <label className="label">Autor</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`input ${errors.author ? "border-red-500" : ""}`}
            />
            {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
          </div>
        </div>

        {/* Gênero e Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Gênero</label>
            <select
              name="genreId"
              value={formData.genre?.id || formData.genreId || ""}
              onChange={handleChange}
              className="input"
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="QUERO_LER">Quero Ler</option>
              <option value="LENDO">Lendo</option>
              <option value="LIDO">Lido</option>
              <option value="PAUSADO">Pausado</option>
              <option value="ABANDONADO">Abandonado</option>
            </select>
          </div>
        </div>

        {/* Ano, Páginas e Página Atual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Ano</label>
            <input
              type="number"
              name="year"
              value={formData.year || ""}
              onChange={handleChange}
              className={`input ${errors.year ? "border-red-500" : ""}`}
            />
            {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
          </div>
          <div>
            <label className="label">Páginas</label>
            <input
              type="number"
              name="pages"
              value={formData.pages || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Página Atual</label>
            <input
              type="number"
              name="currentPage"
              value={formData.currentPage || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* ISBN e Capa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">ISBN</label>
            <input
              name="isbn"
              value={formData.isbn || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">URL da Capa</label>
            <input
              name="cover"
              value={formData.cover || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Avaliação */}
        <div>
          <label className="label">Avaliação</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            value={formData.rating || 0}
            onChange={handleChange}
            className={`input ${errors.rating ? "border-red-500" : ""}`}
          />
          {errors.rating && <span className="text-red-500 text-sm">{errors.rating}</span>}
        </div>

        {/* Sinopse e Notas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Sinopse</label>
            <textarea
              name="synopsis"
              value={formData.synopsis || ""}
              onChange={handleChange}
              className="input"
              rows={4}
            />
          </div>
          <div>
            <label className="label">Notas Pessoais</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              className="input"
              rows={4}
            />
          </div>
        </div>

        {/* Botão Final */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded transition-colors duration-300"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}
