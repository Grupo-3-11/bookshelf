import { Book } from "../types/book"

export const books: Book[] = [

 {
    id: "1",
    title: "1984",
    author: "George Orwell",
    genre: "Ficção Científica",
    year: 1949,
    pages: 328,
    rating: 5,
    synopsis: "Romance distópico sobre vigilância e autoritarismo.",
    cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
  },

 {
        id: "2",
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        genre: "Literatura Infantojuvenil",
        year: 1943,
        pages: 96,
        rating: 5,
        synopsis: "Uma fábula poética sobre amizade, amor e o sentido da vida, contada por um pequeno viajante de outro planeta.",
        cover: "https://www.amazon.com.br/Pequeno-Pr%C3%ADncipe-Antoine-Saint-Exup%C3%A9ry/dp/6584956180",
},

  {
    id: "3",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1937,
    pages: 310,
    rating: 4,
    synopsis: "Aventura de Bilbo Bolseiro pela Terra Média.",
    cover: "https://m.media-amazon.com/images/I/81t2CVWEsUL.jpg",
  },
  {
    id: "4",
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    genre: "História",
    year: -500,
    pages: 200,
    rating: 4,
    synopsis: "Estratégias militares aplicadas a diversas áreas da vida.",
    cover: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programação",
    year: 2008,
    pages: 464,
    rating: 5,
    synopsis: "Boas práticas para escrever código limpo e sustentável.",
    cover: "https://m.media-amazon.com/images/I/41jEbK-jG+L.jpg",
  },
]
