// PASSO 1: IMPORTANDO O COMPONENTE QUE SERÁ USADO NESTA PÁGINA
// =============================================================

// Aqui, estamos importando o nosso componente de formulário, o <BookForm />.
// O caminho '../components/BookForm' é o "mapa" para o arquivo.
// - '../' significa "suba um nível de pasta". Como estamos em `app/page.tsx`,
//   ele sobe para a raiz do projeto.
// - 'components/BookForm' então entra na pasta de componentes para encontrar o arquivo.
import BookForm from '../components/BookForm';


// PASSO 2: CRIANDO O COMPONENTE DA PÁGINA INICIAL
// ===============================================

// 'export default function HomePage()'
// Esta é a definição da nossa página inicial. Como o arquivo se chama `page.tsx`
// e está DIRETAMENTE dentro da pasta `app`, o Next.js entende que este
// componente é a "homepage" do site, a primeira coisa que aparece
// quando alguém acessa a URL principal (ex: http://localhost:3000/).
export default function HomePage() {

  // O 'return' define a estrutura visual da página.
  return (
    
    // Usamos a tag <main> para indicar que este é o conteúdo principal da página.
    // As classes do Tailwind CSS centralizam o formulário na tela com um
    // espaçamento vertical, da mesma forma que na página de "Adicionar Livro".
    <main className="flex justify-center py-10">

      {/* E aqui, simplesmente renderizamos o nosso formulário.
          Isso faz com que, ao entrar no seu site, o usuário já
          dê de cara com a funcionalidade de adicionar um novo livro. */}
      <BookForm />

    </main>
  );
}