import { prisma } from "./prisma"
import { Book } from "@prisma/client"

// 📚 Buscar todos os livros
export async function getBooks() {
  try {
    return await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      include: { genre: true },
    })
  } catch (error) {
    console.error("Erro ao buscar livros:", error)
    throw error
  }
}

// 📖 Buscar um livro pelo ID
export async function getBook(id: string) {
  try {
    return await prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    })
  } catch (error) {
    console.error("Erro ao buscar livro:", error)
    throw error
  }
}

// 🆕 Criar um novo livro
export async function createBook(data: Partial<Book>) {
  try {
    const { genreId, ...rest } = data

    return await prisma.book.create({
      data: {
        ...rest,
        ...(genreId && { genre: { connect: { id: genreId } } }),
      },
    })
  } catch (error) {
    console.error("Erro ao criar livro:", error)
    throw error
  }
}

// ✏️ Atualizar um livro existente
export async function updateBook(id: string, data: Partial<Book>) {
  try {
    const { genreId, ...rest } = data

    return await prisma.book.update({
      where: { id },
      data: {
        ...rest,
        ...(genreId && { genre: { connect: { id: genreId } } }),
      },
    })
  } catch (error) {
    console.error("Erro ao atualizar livro:", error)
    throw error
  }
}

// 🗑️ Excluir um livro
export async function deleteBook(id: string) {
  try {
    return await prisma.book.delete({ where: { id } })
  } catch (error) {
    console.error("Erro ao excluir livro:", error)
    throw error
  }
}
