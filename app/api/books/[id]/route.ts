import { NextResponse } from "next/server"
import { getBook, updateBook, deleteBook } from "@/lib/book"

// 📖 GET → obtém um livro pelo ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const book = await getBook(params.id)
    if (!book) {
      return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
    }
    return NextResponse.json(book)
  } catch (error) {
    console.error("Erro ao buscar livro:", error)
    return NextResponse.json({ error: "Erro ao buscar livro" }, { status: 500 })
  }
}

// ✏️ PUT → atualiza um livro
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const updated = await updateBook(params.id, data)
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Erro ao atualizar livro:", error)
    return NextResponse.json({ error: "Erro ao atualizar livro" }, { status: 500 })
  }
}

// 🗑️ DELETE → exclui um livro
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteBook(params.id)
    return NextResponse.json({ message: "Livro excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir livro:", error)
    return NextResponse.json({ error: "Erro ao excluir livro" }, { status: 500 })
  }
}
