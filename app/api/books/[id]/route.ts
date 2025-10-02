import { NextResponse } from "next/server"
import { books as defaultBooks } from "@/data/books"
import { getLocalBooks, setLocalBooks } from "@/lib/bookStore"
import { Book } from "@/app/types/book"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const allBooks = [...defaultBooks, ...getLocalBooks()]
  const book = allBooks.find((b) => String(b.id) === String(id) && !b.deleted)

  if (!book) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 })
  }

  return NextResponse.json(book)
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const data = await request.json()
  const allBooks = [...defaultBooks, ...getLocalBooks()]
  const book = allBooks.find((b) => String(b.id) === String(id) && !b.deleted)

  if (!book) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 })
  }

  const updatedBook = { ...book, ...data }
  const currentLocal = getLocalBooks()

  if (defaultBooks.some((b) => String(b.id) === String(id))) {
    setLocalBooks([
      updatedBook,
      ...currentLocal.filter((b) => String(b.id) !== String(id)),
    ])
  } else {
    setLocalBooks(
      currentLocal.map((b) =>
        String(b.id) === String(id) ? updatedBook : b
      )
    )
  }

  return NextResponse.json(updatedBook)
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const allBooks = [...defaultBooks, ...getLocalBooks()]
  const book = allBooks.find((b) => String(b.id) === String(id) && !b.deleted)

  if (!book) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 })
  }

  const currentLocal = getLocalBooks()

  if (defaultBooks.some((b) => String(b.id) === String(id))) {
    setLocalBooks([
      ...currentLocal.filter((b) => String(b.id) !== String(id)),
      { ...book, deleted: true },
    ])
  } else {
    setLocalBooks(currentLocal.filter((b) => String(b.id) !== String(id)))
  }

  return NextResponse.json({ message: "Livro excluído com sucesso" })
}
