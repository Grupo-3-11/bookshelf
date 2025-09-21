// Importa o componente do formulário que você criou
import BookForm from '@/components/BookForm';

// Esta é a função da página de "Adicionar Livro"
export default function AddBookPage() {
  return (
    <main className="flex justify-center py-10">
        {/* E aqui nós usamos o componente do formulário */}
        <BookForm />
    </main>
  );
}