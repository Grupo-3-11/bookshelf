export interface CreateBookData {
  title: string
  author: string
  genreId: string
  year: number
  pages?: number
  rating?: number
  synopsis?: string
  cover?: string
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO"
  currentPage?: number
  isbn?: string
  notes?: string
}

export interface UpdateBookData extends Partial<CreateBookData> {}

// ✅ Tipo completo de livro retornado do backend
export interface Book {
  id: string
  title: string
  author: string
  genreId?: string
  genre?: {
    id: string
    name: string
  }
  year?: number
  pages?: number
  rating?: number
  synopsis?: string
  cover?: string
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO"
  currentPage?: number
  isbn?: string
  notes?: string
  createdAt: string
}
