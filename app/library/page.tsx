"use client"

import { useEffect, useState } from "react"
import { BookCard } from "@/components/BookCard"
import { Book } from "@/app/types/book"
import { getAllBooks } from "@/lib/storage"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    setBooks(getAllBooks())
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Biblioteca</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
