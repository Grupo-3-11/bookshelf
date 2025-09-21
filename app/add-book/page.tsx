// PASSO 1: IMPORTANDO O COMPONENTE PRINCIPAL DESTA PÁGINA
// =======================================================

// Aqui, estamos importando o nosso super formulário, o <BookForm />, que
// foi construído em seu próprio arquivo.
// O caminho '@/components/BookForm' usa o atalho (alias) que configuramos
// no tsconfig.json. O '@/' aponta para a raiz do projeto, o que torna
// a importação de componentes muito mais limpa e fácil.
import BookForm from '@/components/BookForm';


// PASSO 2: CRIANDO O COMPONENTE DA PÁGINA
// ===========================================

// 'export default function AddBookPage()'
// Esta é a definição da nossa página. Como o arquivo se chama `page.tsx` e está
// dentro da pasta `app/add-book/`, o Next.js automaticamente cria uma rota
// no nosso site com o endereço `/add-book` para este componente.
export default function AddBookPage() {

  // O 'return' define o que será visualmente renderizado na tela.
  // Toda a estrutura da página fica aqui dentro, usando a sintaxe JSX.
  return (
  
    // A tag '<main>' é uma boa prática de HTML semântico. Ela diz ao navegador
    // que este é o conteúdo principal e mais importante da página.
    // As classes do Tailwind CSS (className) estilizam nosso layout:
    // - 'flex': Ativa um modo de layout moderno e flexível.
    // - 'justify-center': Centraliza o conteúdo filho (o formulário) no meio do eixo horizontal.
    // - 'py-10': Adiciona um preenchimento (padding) vertical (eixo Y) para dar um respiro.
    <main className="flex justify-center py-10">

      {/* AQUI ESTÁ ONDE A MÁGICA ACONTECE! */}
      {/* Em vez de escrever todo o código do formulário aqui, nós simplesmente
          chamamos o componente <BookForm /> que importamos.
          
          Pense nesta página (AddBookPage) como um "palco" limpo e organizado.
          E o <BookForm /> é o "ator principal", com todo o seu roteiro complexo
          (campos, estados, preview da capa), que sobe no palco para atuar.
          
          Essa prática de dividir a interface em componentes reutilizáveis é o
          coração do React e deixa nosso código muito mais fácil de manter. */}
      <BookForm />

    </main>
  );
}