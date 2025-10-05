"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-blue-600 dark:bg-gray-900 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center shadow">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          📚 BookShelf
        </Link>
        <button
          className="md:hidden text-white dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`flex-col md:flex-row md:flex gap-4 ${menuOpen ? "flex" : "hidden"} md:gap-4 mt-4 md:mt-0`}>
        <Link href="/dashboard" className="hover:underline text-white dark:text-gray-200">Dashboard</Link>
        <Link href="/library" className="hover:underline text-white dark:text-gray-200">Biblioteca</Link>
        <Link href="/add-book" className="hover:underline text-white dark:text-gray-200">Adicionar Livro</Link>

        <Link href="/categories" className="hover:underline text-white dark:text-gray-200">Categorias</Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
