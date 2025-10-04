"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Book } from "@/app/types/book"

type Props = { params: Promise<{ id: string }> }

export default function EditBookPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${id}`)
        if (!res.ok) throw new Error("Erro ao buscar livro")
        const data = await res.json()
        setFormData(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

<<<<<<< HEAD
    fetchBook()
  }, [id])

=======
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

<<<<<<< HEAD
  function validateForm(data: Book) {
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
          year: Number(formData.year) || undefined,
          pages: Number(formData.pages) || undefined,
          rating: Number(formData.rating) || 0,
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
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4">Editar Livro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Título:</span>
=======
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
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Autor:</span>
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Autor:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
          />
          {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Ano:</span>
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Ano:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <input
            type="number"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
          />
          {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Páginas:</span>
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Páginas:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <input
            type="number"
            name="pages"
            value={formData.pages || ""}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Gênero:</span>
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Gênero:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <select
            name="genre"
            value={formData.genre || ""}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
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

<<<<<<< HEAD
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Avaliação:</span>
=======
        <label className="text-gray-700 dark:text-gray-200">
          Avaliação:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            value={formData.rating || 0}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
          />
          {errors.rating && <span className="text-red-500 text-sm">{errors.rating}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Sinopse:</span>
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="text-gray-700 dark:text-gray-200">
          Sinopse:
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          <textarea
            name="synopsis"
            value={formData.synopsis || ""}
            onChange={handleChange}
<<<<<<< HEAD
            className="border p-2 rounded bg-white dark:bg-gray-700"
=======
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
          />
        </label>

        <button
          type="submit"
<<<<<<< HEAD
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-colors duration-300"
=======
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-colors"
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
