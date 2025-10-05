"use client"

import { Book } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  book: Book
}

export function BookCardDashboard({ book }: Props) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/books/${book.id}`)}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden 
                 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={book.cover || "/fallback-cover.jpg"}
        alt={book.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{book.author}</p>
        {book.genre?.name && (
          <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            {book.genre.name}
          </span>
        )}
      </div>
    </div>
  )
}
