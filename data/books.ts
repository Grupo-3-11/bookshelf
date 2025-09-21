// PASSO 1: IMPORTANDO O "MOLDE" DO NOSSO LIVRO
// ===========================================

// Aqui, estamos importando uma 'interface' ou 'type' chamada 'Book'.
// Pense nisso como a planta baixa ou o molde de um objeto 'livro'.
// Esse molde diz quais propriedades um livro DEVE ter (como id, title, author)
// e qual o tipo de cada uma (id é string, year é number, etc.).
// Isso ajuda a gente a não esquecer nenhuma informação importante ao adicionar um novo livro.
import { Book } from "../types/book";


// PASSO 2: CRIANDO E EXPORTANDO NOSSA LISTA DE LIVROS
// ==================================================

// 'export' significa que estamos tornando esta lista disponível para outros arquivos
// do nosso projeto poderem usar (como a nossa página do Dashboard).
// 'const books' declara nossa lista. 'const' significa que essa variável não pode ser
// reatribuída depois.

// A parte ': Book[]' é a mágica do TypeScript!
// Estamos dizendo: "Ei, TypeScript, esta variável 'books' é um ARRAY (`[]`)
// e CADA item dentro deste array TEM que seguir o molde 'Book' que a gente importou".
// Se a gente esquecer um 'title' ou colocar o 'year' como texto, o TS vai nos avisar!
export const books: Book[] = [

  // A lista começa aqui com o colchete '['.
  // Cada livro é um OBJETO, representado pelas chaves '{ }'.

  // Livro 1
  {
    id: "1",                     // Identificador único, como um RG.
    title: "1984",                 // O título do livro.
    author: "George Orwell",       // Quem escreveu.
    genre: "Ficção Científica / Distopia", // O gênero literário.
    year: 1949,                    // O ano de publicação.
    pages: 328,                    // Quantas páginas tem.
    rating: 5,                     // Nossa avaliação de 0 a 5.
    synopsis:                      // Um pequeno resumo sobre a obra.
      "Um romance distópico que explora temas de vigilância, manipulação da informação e autoritarismo.",
    cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg", // O link direto para a imagem da capa.
  }, // A vírgula separa um objeto de livro do outro.

  // Livro 2
  {
    id: "2",
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    genre: "Literatura Infantojuvenil",
    year: 1943,
    pages: 96,
    rating: 5,
    synopsis:
      "Uma fábula poética sobre amizade, amor e o verdadeiro sentido da vida, contada por um pequeno viajante de outro planeta.",
    cover: "https://m.media-amazon.com/images/I/61M1YP+XjJL._AC_UF1000,1000_QL80_.jpg",
  },

  // Livro 3
  {
    id: "3",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1937,
    pages: 310,
    rating: 4,
    synopsis:
      "A jornada de Bilbo Bolseiro pela Terra Média, enfrentando dragões, trolls e desafios inesperados.",
    cover: "https://m.media-amazon.com/images/I/81t2CVWEsUL._AC_UF1000,1000_QL80_.jpg",
  },

  // Livro 4
  {
    id: "4",
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    genre: "Estratégia / Filosofia",
    year: -500, // Um ano antes de Cristo :)
    pages: 200,
    rating: 4,
    synopsis:
      "Clássico da estratégia militar que inspira líderes, empreendedores e pensadores há mais de dois mil anos.",
    cover: "https://m.media-amazon.com/images/I/71tbalAHYCL._AC_UF1000,1000_QL80_.jpg",
  },

  // Livro 5
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programação",
    year: 2008,
    pages: 464,
    rating: 5,
    synopsis:
      "Referência essencial para desenvolvedores que desejam escrever código limpo, legível e sustentável.",
    cover: "https://m.media-amazon.com/images/I/41xShlnTZTL._AC_UF1000,1000_QL80_.jpg",
  },

// A lista termina aqui com o colchete ']'.
];