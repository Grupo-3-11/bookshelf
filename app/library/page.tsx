// PASSO 1: CONFIGURAÇÃO E IMPORTAÇÕES
// ===================================

// "use client";
// Marcamos como um Componente de Cliente porque ele precisa usar 'hooks'
// do React (useState e useEffect) para buscar dados do localStorage e gerenciar
// a lista de livros de forma dinâmica no navegador.
"use client";

// Importamos as ferramentas 'useState' (para criar nossa "memória") e 'useEffect'
// (para executar código depois que a página carregar) do React.
import { useState, useEffect } from 'react';

// Importamos nossas "peças de Lego" e dados necessários:
// - {BookCard}: O componente visual para mostrar um único livro.
// - {books as initialBooks}: Nossa lista de livros padrão, que apelidamos de 'initialBooks'.
// - {Book}: O "molde" ou "planta baixa" que define como um objeto de livro deve ser.
import { BookCard } from '../../components/BookCard';
import { books as initialBooks } from '../../data/books';
import { Book } from '../../types/book';


// PASSO 2: CRIANDO O COMPONENTE DA PÁGINA DA BIBLIOTECA
// ====================================================

// Aqui definimos o componente da nossa página. Como ele está em `app/library/page.tsx`,
// o Next.js o renderiza na URL `/library`.
export default function LibraryPage() {

  // --- LÓGICA DO COMPONENTE ---

  // Criamos uma "caixinha de memória" (estado) chamada 'books' para guardar a lista
  // de livros que será mostrada na tela. Ela começa como um array vazio (`[]`).
  const [books, setBooks] = useState<Book[]>([]);

  // O 'useEffect' é usado para executar um código que precisa interagir com o "mundo exterior",
  // como o localStorage do navegador. Ele roda DEPOIS que a página já foi desenhada na tela.
  useEffect(() => {
    
    // Tentamos pegar os livros que estão salvos na nossa "gaveta" (localStorage).
    // O 'JSON.parse' transforma o texto guardado de volta em um objeto/array JavaScript.
    const savedBooks = JSON.parse(localStorage.getItem("books") || "null");

    // Verificamos o que encontramos na gaveta:
    // Se 'savedBooks' tiver alguma coisa (ou seja, não for nulo), a gente usa essa lista.
    // Se não (`||`), a gente usa a nossa lista de livros inicial ('initialBooks').
    setBooks(savedBooks || initialBooks);

  // O `[]` vazio no final é super importante. Ele diz ao React:
  // "rode este efeito apenas UMA VEZ, logo depois que a página carregar pela primeira vez".
  }, []);

  // --- PARTE VISUAL (JSX) ---

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Biblioteca</h2>

      {/* A nossa grade responsiva que exibe os livros. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Usamos o '.map()' para percorrer a lista de livros que está na nossa memória 'books'.
            Para cada 'book' na lista, criamos um componente <BookCard />. */}
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}

      </div>
    </div>
  );
}