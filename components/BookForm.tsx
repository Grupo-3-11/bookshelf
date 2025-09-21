// PASSO 1: CONFIGURAÇÃO PARA INTERATIVIDADE E NAVEGAÇÃO
// =======================================================

// "use client";
// Essencial! Avisa ao Next.js que este componente é interativo e precisa
// rodar no navegador do usuário, pois usa 'useState' e manipula o localStorage.
"use client";

// Importamos a ferramenta 'useState' para criar as "memórias" do nosso formulário.
import { useState } from 'react';
// Importamos o 'useRouter' do Next.js para poder navegar entre as páginas.
import { useRouter } from 'next/navigation'; 
// Importamos o "molde" (type) do Livro para garantir que nossos dados estejam corretos.
import { Book } from '../types/book';
// Importamos a lista de livros inicial, para o caso de o localStorage estar vazio.
import { books as initialBooks } from '../data/books'; 


// PASSO 2: DEFININDO O COMPONENTE DO FORMULÁRIO
// ============================================

export default function BookForm() {

  // --- LÓGICA DO COMPONENTE ---

  // Ativamos a ferramenta de navegação para usar mais tarde.
  const router = useRouter(); 

  // Criamos uma "caixinha de memória" (estado) para CADA campo do formulário.
  // Isso nos permite saber exatamente o que o usuário está digitando em tempo real.
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [status, setStatus] = useState('QUERO_LER'); // O valor inicial do nosso menu dropdown.
  const [notes, setNotes] = useState('');

  // Esta é a função "cérebro" que é executada quando o usuário clica no botão "Adicionar Livro".
  const handleSubmit = (event: React.FormEvent) => {
    
    // ESSA LINHA É MÁGICA E SUPER IMPORTANTE!
    // Ela impede que o formulário recarregue a página, que é o comportamento padrão do HTML.
    // Assim, a gente assume o controle total com o nosso código JavaScript.
    event.preventDefault();

    // Juntamos todas as informações que estavam guardadas nas nossas "memórias" (estados)
    // para criar um objeto JavaScript que representa nosso novo livro.
    const newBook: Book = {
      id: String(Date.now()), // Um jeito simples de criar um ID único usando a data e hora.
      title, // Forma curta de 'title: title'
      author,
      pages: Number(pages), // Converte o texto do campo de páginas para um número.
      cover: coverUrl,
      status,
      genre: "Não definido", // Valores padrão para campos que não estão no formulário.
      year: new Date().getFullYear(),
      rating: 0,
      synopsis: notes,
    };

    // --- LÓGICA PARA SALVAR NA "GAVETA" (localStorage) ---
    const savedBooks = JSON.parse(localStorage.getItem("books") || "null");
    // Nosso "espião" para ver no console o que já estava salvo.
    console.log("Formulário vai adicionar. Livros que já existem:", savedBooks);
    
    // Se não havia nada salvo, usamos a lista inicial como base.
    const existingBooks = savedBooks || initialBooks;
    // Criamos a lista final, colocando o livro novo no início da lista existente.
    const updatedBooks = [newBook, ...existingBooks];
    // Nosso segundo "espião" para ver a lista final antes de salvar.
    console.log("Lista atualizada que será salva:", updatedBooks);

    // Guardamos a lista final e atualizada de volta na "gaveta".
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Damos um feedback para o usuário.
    alert("Livro adicionado com sucesso!");

    // Forçamos o redirecionamento e recarregamento da página do Dashboard
    // para garantir que ele leia os dados mais recentes.
    window.location.href = '/dashboard'; 
  };


  // --- PARTE VISUAL (JSX) ---

  return (
    // Conectamos nossa função 'handleSubmit' ao evento 'onSubmit' do formulário.
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Livro</h1>

      {/* Preview da capa, que só aparece se tiver uma URL na memória 'coverUrl' */}
      {coverUrl && (
        <div className="mb-4 text-center">
          <img src={coverUrl} alt="Pré-visualização da capa" className="max-w-xs mx-auto h-auto rounded-lg shadow-md" />
        </div>
      )}

      {/* Cada campo abaixo é um "componente controlado". O React está 100% no comando
          do que aparece no campo ('value') e do que acontece quando o usuário digita ('onChange'). */}
      
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">Título:</label>
        <input type="text" id="titulo" name="titulo" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div className="mb-6">
        <label htmlFor="autor" className="block text-gray-700 font-bold mb-2">Autor:</label>
        <input type="text" id="autor" name="autor" required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div className="mb-4">
        <label htmlFor="paginas" className="block text-gray-700 font-bold mb-2">Total de Páginas:</label>
        <input type="number" id="paginas" name="paginas" value={pages} onChange={(e) => setPages(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div className="mb-6">
        <label htmlFor="capa" className="block text-gray-700 font-bold mb-2">URL da Capa:</label>
        <input type="url" id="capa" name="capa" className="w-full px-3 py-2 border rounded-lg" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status de Leitura:</label>
        <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
          <option value="QUERO_LER">Quero Ler</option>
          <option value="LENDO">Lendo</option>
          <option value="LIDO">Lido</option>
          <option value="PAUSADO">Pausado</option>
          <option value="ABANDONADO">Abandonado</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="notas" className="block text-gray-700 font-bold mb-2">Notas Pessoais:</label>
        <textarea id="notas" name="notas" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 border rounded-lg"></textarea>
      </div>
      
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        Adicionar Livro
      </button>
    </form>
  );
}