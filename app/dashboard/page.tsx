import { BookCardDashboard } from "@/components/BookCardDashboard"

export default async function DashboardPage() {
  const res = await fetch("http://localhost:3000/api/books", { cache: "no-store" })

  if (!res.ok) {
    console.error("Erro ao buscar livros:", await res.text())
    return <p className="text-center mt-10">Erro ao carregar livros.</p>
  }

  const books = await res.json()

  const totalLivros = books.length
  const queroLer = books.filter((b: any) => b.status === "QUERO_LER").length
  const lendo = books.filter((b: any) => b.status === "LENDO").length
  const lidos = books.filter((b: any) => b.status === "LIDO").length
  const paginasLidas = books.reduce((s: number, b: any) => s + (b.pages || 0), 0)

  return (
    <div className="container mx-auto p-4 md:p-8">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total de Livros</h3>
            <p className="text-2xl font-bold">{totalLivros}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Quero Ler</h3>
            <p className="text-2xl font-bold">{queroLer}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Lendo</h3>
            <p className="text-2xl font-bold">{lendo}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Lidos</h3>
            <p className="text-2xl font-bold">{lidos}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Páginas Lidas</h3>
            <p className="text-2xl font-bold">{paginasLidas}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Biblioteca</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book: any) => (
            <BookCardDashboard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}
