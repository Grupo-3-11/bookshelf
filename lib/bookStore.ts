import { Book } from "@/app/types/book"

let localBooks: (Book & { deleted?: boolean })[] = []

export function getLocalBooks() {
  return localBooks
}

export function setLocalBooks(newList: (Book & { deleted?: boolean })[]) {
  localBooks = newList
}

export function addBook(book: Book) {
  localBooks.unshift(book)
}
