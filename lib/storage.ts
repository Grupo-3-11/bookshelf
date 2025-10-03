import { v4 as uuidv4 } from "uuid"
import { Book } from "@/app/types/book"

const STORAGE_KEY = "books"

export function getAllBooks(): Book[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  const parsed = JSON.parse(data) as Book[]

  // remove duplicados pelo id
  const uniqueBooks = Array.from(new Map(parsed.map(b => [b.id, b])).values())
  return uniqueBooks
}

export function addBook(newBook: Omit<Book, "id">): Book {
  const books = getAllBooks()

  // cria ID único
  const book: Book = { ...newBook, id: uuidv4() }

  // checa se já existe livro igual (mesmo título + autor)
  const exists = books.some(
    (b) =>
      b.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
      b.author.trim().toLowerCase() === book.author.trim().toLowerCase()
  )

  if (exists) {
    throw new Error("Esse livro já existe na biblioteca.")
  }

  const updatedBooks = [...books, book]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks))
  return book
}

export function deleteBookById(id: string) {
  const books = getAllBooks()
  const updatedBooks = books.filter((book) => book.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks))
}
