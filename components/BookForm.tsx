"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreateBookData } from "@/app/types/book"

export default function BookForm() {
  const router = useRouter()
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([])
  const [genreId, setGenreId] = useState("")
  const [form, setForm] = useState<CreateBookData>({
    title: "",
    author: "",
    genreId: "",
    year: new Date().getFullYear(),
    pages: 0,
    rating: 0,
    synopsis: "",
    cover: "",
    status: "QUERO_LER",
    currentPage: 0,
    isbn: "",
    notes: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch("/api/genres")
      const data = await res.json()
      setGenres(data)
      if (data.length > 0) {
        setGenreId(data[0].id)
        setForm((prev) => ({ ...prev, genreId: data[0].id }))
      }
    }
    fetchGenres()
  }, [])

  function updateField(field: keyof CreateBookData, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: false }))
  }

  function validateForm() {
    const requiredFields: (keyof CreateBookData)[] = ["title", "author", "genreId"]
    const newErrors: { [key: string]: boolean } = {}
    requiredFields.forEach((field) => {
      if (!form[field]) newErrors[field] = true
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) {
      alert("Preencha os campos obrigatórios.")
      return
    }

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
      className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Adicionar Livro</h2>

      {/* Preview da capa */}
      {form.cover && (
        <div className="text-center">
          <img src={form.cover} alt="Pré-visualização da capa" className="max-h-64 mx-auto rounded-lg shadow-md" />
        </div>
      )}

      {/* Título e Autor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Título *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={`input ${errors.title ? "border-red-500" : ""}`}
          />
        </div>
        <div>
          <label className="label">Autor *</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
            className={`input ${errors.author ? "border-red-500" : ""}`}
          />
        </div>
      </div>

      {/* Gênero e Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Gênero *</label>
          <select
            value={genreId}
            onChange={(e) => {
              setGenreId(e.target.value)
              updateField("genreId", e.target.value)
            }}
            className={`input ${errors.genreId ? "border-red-500" : ""}`}
          >
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Status de Leitura</label>
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)} className="input">
            <option value="QUERO_LER">Quero Ler</option>
            <option value="LENDO">Lendo</option>
            <option value="LIDO">Lido</option>
            <option value="PAUSADO">Pausado</option>
            <option value="ABANDONADO">Abandonado</option>
          </select>
        </div>
      </div>

      {/* Ano, Páginas, Página Atual */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="label">Ano</label>
          <input type="number" value={form.year} onChange={(e) => updateField("year", Number(e.target.value))} className="input" />
        </div>
        <div>
          <label className="label">Total de Páginas</label>
          <input type="number" value={form.pages} onChange={(e) => updateField("pages", Number(e.target.value))} className="input" />
        </div>
        <div>
          <label className="label">Página Atual</label>
          <input type="number" value={form.currentPage} onChange={(e) => updateField("currentPage", Number(e.target.value))} className="input" />
        </div>
      </div>

      {/* ISBN e Capa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">ISBN</label>
          <input type="text" value={form.isbn} onChange={(e) => updateField("isbn", e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">URL da Capa</label>
          <input type="url" value={form.cover} onChange={(e) => updateField("cover", e.target.value)} className="input" />
        </div>
      </div>

      {/* Avaliação */}
      <div>
        <label className="label">Avaliação</label>
        <div className="flex gap-2 text-2xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} onClick={() => updateField("rating", i + 1)} className={`cursor-pointer ${i < form.rating ? "text-yellow-500" : "text-gray-300"}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Sinopse e Notas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Sinopse</label>
          <textarea rows={4} value={form.synopsis} onChange={(e) => updateField("synopsis", e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">Notas Pessoais</label>
          <textarea rows={4} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} className="input" />
        </div>
      </div>

      {/* Botão */}
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        Salvar Livro
      </button>
    </form>
  )
}
