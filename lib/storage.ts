// lib/storage.ts
import { Book } from "@/app/types/book"
import { books as defaultBooks } from "@/data/books"

const isBrowser = () => typeof window !== "undefined"

function getLocalBooks(): Book[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem("books")
    return raw ? (JSON.parse(raw) as Book[]) : []
  } catch {
    return []
  }
}

function saveLocalBooks(list: Book[]) {
  if (!isBrowser()) return
  localStorage.setItem("books", JSON.stringify(list))
}

function getDeletedIds(): string[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem("deleted")
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function saveDeletedIds(list: string[]) {
  if (!isBrowser()) return
  localStorage.setItem("deleted", JSON.stringify(list))
}

export function getAllBooks(): Book[] {
  if (!isBrowser()) return defaultBooks
  const local = getLocalBooks()
  const deleted = getDeletedIds()
  const defaultsFiltered = defaultBooks.filter((d) => !deleted.includes(d.id))
  return [...defaultsFiltered, ...local]
}

export function getBookById(id: string): Book | undefined {
  return getAllBooks().find((b) => b.id === id)
}

export function addBook(newBook: Book) {
  const local = getLocalBooks()
  local.unshift(newBook)
  saveLocalBooks(local)
}

export function updateBook(updated: Book) {
  const local = getLocalBooks()
  const idx = local.findIndex((b) => b.id === updated.id)
  if (idx !== -1) {
    local[idx] = updated
    saveLocalBooks(local)
    return
  }
  // Se não estiver em local (então era um livro padrão), adiciona versão editada no local (override)
  local.unshift(updated)
  saveLocalBooks(local)
}

export function deleteBookById(id: string) {
  const local = getLocalBooks()
  const filteredLocal = local.filter((b) => b.id !== id)
  if (filteredLocal.length !== local.length) {
    // estava em local => remove e salva
    saveLocalBooks(filteredLocal)
    return
  }
  // se era um book padrão, marca como deletado
  const deleted = getDeletedIds()
  if (!deleted.includes(id)) {
    deleted.push(id)
    saveDeletedIds(deleted)
  }
}
