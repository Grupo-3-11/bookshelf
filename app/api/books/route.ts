import { NextResponse } from "next/server"
import { books as defaultBooks } from "@/data/books"
import { getLocalBooks, setLocalBooks, addBook } from "@/lib/bookStore"
import { Book } from "@/app/types/book"

export async function GET() {
  const deletedIds = getLocalBooks().filter((b) => b.deleted).map((b) => b.id)
  const activeDefaults = defaultBooks.filter((b) => !deletedIds.includes(b.id))
  const activeLocal = getLocalBooks().filter((b) => !b.deleted)
  return NextResponse.json([...activeDefaults, ...activeLocal])
}

export async function POST(request: Request) {
  const data = await request.json()
  const newBook: Book = {
    id: crypto.randomUUID(),
    title: data.title,
    author: data.author,
    pages: data.pages || 0,
    cover: data.cover || "",
    status: data.status || "QUERO_LER",
    genre: data.genre || "Não definido",
    year: data.year || new Date().getFullYear(),
    rating: data.rating || 0,
    synopsis: data.synopsis || "",
  }

  addBook(newBook) // ✅ usa função segura
  return NextResponse.json(newBook, { status: 201 })
}
