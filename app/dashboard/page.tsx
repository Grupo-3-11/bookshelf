// PASSO 1: CONFIGURAÇÃO E IMPORTAÇÕES ESSENCIAIS
// ===============================================

// "use client";
// Essencial para esta página! Marcamos como Componente de Cliente porque
// ela é altamente interativa: tem uma busca que muda em tempo real e precisa
// ler dados do localStorage do navegador, coisas que só podem acontecer no lado do cliente.
"use client";

// Importamos nossas ferramentas do React:
// - useState: para criar as "memórias" que guardarão a lista de livros e o texto da busca.
// - useEffect: para executar a lógica de carregamento dos livros do localStorage
//   depois que a página for desenhada na tela.
import { useState, useEffect } from 'react';

// Importamos nossos componentes e dados:
// - StatsCard e BookCard: as peças de Lego visuais.
// - initialBooks: a lista de livros inicial, para o caso de o usuário ser novo.
// - Book: o "molde" que garante que nossos objetos de livro tenham a forma correta.
import { StatsCard } from '../../components/StatsCard';
import { BookCard } from '../../components/BookCard';
import { books as initialBooks } from '../../data/books';
import { Book } from '../../types/book';


// PASSO 2: CRIANDO O COMPONENTE DA PÁGINA DASHBOARD
// =================================================

export default function DashboardPage() {

  // --- LÓGICA DO COMPONENTE ---

  // Criamos as "caixinhas de memória" (estados) da nossa página:
  // - 'books': vai guardar a lista de livros que será exibida. Começa como um array vazio.
  // - 'searchTerm': vai guardar o texto que o usuário digita na busca. Começa vazio.
  const [books, setBooks] = useState<Book[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');

  // O useEffect entra em ação para buscar os dados salvos.
  useEffect(() => {
    // Tenta ler a "gaveta" (localStorage) para ver se já tem livros salvos.
    let savedBooks = JSON.parse(localStorage.getItem("books") || "null");
    
    // Nosso "espião" para ver no console o que foi encontrado.
    console.log("Dashboard carregou. Livros encontrados no localStorage:", savedBooks);
    
    // Se a gaveta estiver vazia ou nunca foi usada...
    if (!savedBooks || savedBooks.length === 0) {
      // ...a gente pega os livros iniciais e já salva eles na gaveta para a próxima vez.
      localStorage.setItem("books", JSON.stringify(initialBooks));
      savedBooks = initialBooks;
    }
    
    // Finalmente, atualizamos nossa memória 'books' com a lista correta.
    setBooks(savedBooks);

  // O '[]' vazio no final garante que essa "mágica" de carregar os dados
  // aconteça apenas uma vez, quando a página abre pela primeira vez.
  }, []);

  // O "cérebro" da busca, que cria uma nova lista filtrada em tempo real.
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- PARTE VISUAL (JSX) ---

  return (
    <div className="container mx-auto p-4 md:p-8">
      
      {/* Seção 1: Estatísticas */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Nossos cards de estatísticas, agora calculando os valores dinamicamente
              a partir da lista de livros que está na memória! */}
          <StatsCard title="Total de Livros" value={books.length} />
          <StatsCard title="Quero Ler" value={books.filter(b => b.status === 'QUERO_LER').length} /> 
          <StatsCard title="Lendo" value={books.filter(b => b.status === 'LENDO').length} /> 
          <StatsCard title="Lidos" value={books.filter(b => b.status === 'LIDO').length} /> 
          <StatsCard title="Páginas Lidas" value={320} /> 
        </div>
      </section>

      {/* Seção 2: Biblioteca */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Biblioteca</h2>
          
          {/* A barra de busca, totalmente conectada com nossa memória 'searchTerm'. */}
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full md:w-80 p-3 border rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* A grade que exibe os livros, usando a lista FILTRADA. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}