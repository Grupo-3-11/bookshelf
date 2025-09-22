"use client"

import { useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          📚 BookShelf
        </Link>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`flex-col md:flex-row md:flex gap-4 ${menuOpen ? "flex" : "hidden"} md:gap-4`}>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/library" className="hover:underline">Biblioteca</Link>
        <Link href="/add-book" className="hover:underline">Adicionar Livro</Link>
      </div>
    </nav>
  )
}