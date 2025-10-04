<<<<<<< HEAD
"use client";

import { useState, useEffect } from 'react';
import { StatsCard } from "@/components/StatsCard";
import { BookCard } from "@/components/BookCard";
import { Book } from "@/app/types/book";
import { getAllBooks, deleteBookById } from "@/lib/storage";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setBooks(getAllBooks());
  }, []);

  function handleDelete(bookId: string) {
    if (confirm("Tem certeza que quer excluir este livro?")) {
      deleteBookById(bookId);
      setBooks(currentBooks => currentBooks.filter(book => book.id !== bookId));
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
=======
import { BookCardDashboard } from "@/components/BookCardDashboard"

export default async function DashboardPage() {
  const res = await fetch("http://localhost:3000/api/books", { cache: "no-store" })

  if (!res.ok) {
    console.error("Erro ao buscar livros:", await res.text())
    return <p className="text-center mt-10">Erro ao carregar livros.</p>
  }

  const books = await res.json()

  const totalLivros = books.length
  const queroLer = books.filter((b: any) => b.status === "QUERO_LER").length
  const lendo = books.filter((b: any) => b.status === "LENDO").length
  const lidos = books.filter((b: any) => b.status === "LIDO").length
  const paginasLidas = books.reduce((s: number, b: any) => s + (b.pages || 0), 0)
>>>>>>> 9fd0cd038656d94c951269885ea83e954f24b449

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total de Livros</h3>
            <p className="text-2xl font-bold">{totalLivros}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Quero Ler</h3>
            <p className="text-2xl font-bold">{queroLer}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Lendo</h3>
            <p className="text-2xl font-bold">{lendo}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Lidos</h3>
            <p className="text-2xl font-bold">{lidos}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Páginas Lidas</h3>
            <p className="text-2xl font-bold">{paginasLidas}</p>
          </div>
        </div>
      </section>

      <section>
<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-6">Biblioteca</h2>
=======
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-white">
            Biblioteca
          </h2>
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full md:w-80 p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
<<<<<<< HEAD
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
=======
          {books.map((book: any) => (
            <BookCardDashboard key={book.id} book={book} />
>>>>>>> 9fd0cd038656d94c951269885ea83e954f24b449
          ))}
        </div>
      </section>
    </div>
  )
}