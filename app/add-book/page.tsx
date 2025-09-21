// PASSO 1: IMPORTANDO O PROTAGONISTA DA PÁGINA
// ===============================================

// Aqui, estamos "importando" o nosso componente de formulário, o <BookForm />.
// Pense nele como uma peça de Lego super complexa que construímos em outro arquivo.
// O caminho '../../components/BookForm' é o "mapa" exato para encontrar essa peça,
// saindo da pasta 'add-book', subindo para 'app', subindo para a raiz do projeto,
// e finalmente entrando na pasta 'components'.
import BookForm from '../../components/BookForm';


// PASSO 2: CRIANDO O "PALCO" DA PÁGINA
// =====================================

// 'export default function AddBookPage()'
// Esta é a definição da nossa página. Como o arquivo se chama `page.tsx` e está
// dentro da pasta `app/add-book/`, o Next.js sabe que este componente
// deve ser mostrado na tela quando alguém acessar a URL `/add--book`.
export default function AddBookPage() {

  // O 'return' define a parte visual da nossa página.
  // Tudo que está aqui dentro será "desenhado" no navegador.
  return (
  
    // A tag '<main>' é uma boa prática de HTML. Ela diz que este é o conteúdo
    // principal e mais importante da página.
    // O 'className' usa classes do Tailwind CSS para estilizar o palco:
    // - 'flex': ativa um modo de layout moderno.
    // - 'justify-center': centraliza o conteúdo no meio (horizontalmente).
    // - 'py-10': adiciona um espaço vertical em cima e embaixo para não ficar colado.
    <main className="flex justify-center py-10">

      {/* A ESTRELA DO SHOW! */}
      {/* Aqui nós simplesmente colocamos o nosso componente <BookForm /> para ser exibido.
          Esta página (AddBookPage) funciona como um palco limpo, e o <BookForm />
          é o ator principal, com todo o seu script e funcionalidades complexas.
          
          Essa técnica de separar componentes complexos em seus próprios arquivos
          deixa nosso código muito mais organizado e fácil de dar manutenção. */}
      <BookForm />

    </main>
  );
}