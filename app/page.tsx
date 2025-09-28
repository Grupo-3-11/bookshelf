import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4">📚 Bem-vindo ao BookShelf</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-6">
        Sua biblioteca pessoal online. Gerencie seus livros, acompanhe seu
        progresso de leitura e organize tudo em um só lugar.
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors duration-300"
      >
        Ir para Dashboard
      </Link>
    </div>
  )
}
