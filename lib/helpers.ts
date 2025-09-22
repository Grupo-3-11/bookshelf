import { Book } from "@/app/types/book"
import { books as defaultBooks } from "@/data/books"

export function getAllBooks(): Book[] {
  if (typeof window === "undefined") return defaultBooks

  const stored = localStorage.getItem("books")
  const localBooks = stored ? JSON.parse(stored) as Book[] : []

  return [...defaultBooks, ...localBooks]
}
