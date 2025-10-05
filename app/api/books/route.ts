import { NextResponse } from "next/server"
import { createBook, getBooks } from "@/lib/book"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validação mínima
    if (!data.title || !data.author) {
      return NextResponse.json({ error: "Título e autor são obrigatórios" }, { status: 400 })
    }

    // Validação do gênero
    if (data.genreId) {
      const genreExists = await prisma.genre.findUnique({ where: { id: data.genreId } })
      if (!genreExists) {
        return NextResponse.json({ error: "Gênero inválido" }, { status: 400 })
      }
    }

    const created = await createBook(data)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar livro:", error)
    return NextResponse.json({ error: "Erro ao criar livro" }, { status: 500 })
  }
}

// GET para listar todos os livros
export async function GET() {
  try {
    const books = await getBooks()
    return NextResponse.json(books)
  } catch (error) {
    console.error("Erro ao buscar livros:", error)
    return NextResponse.json({ error: "Erro ao buscar livro" }, { status: 500 })
  }
}
