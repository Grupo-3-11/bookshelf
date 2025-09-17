import "./_styles/globals.css"
import { Navbar } from "@/components/Navbar"

export const metadata = {
  title: "BookShelf",
  description: "Gerenciador de livros pessoais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
