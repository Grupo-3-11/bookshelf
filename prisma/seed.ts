import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const genres = [
    "Literatura Brasileira",
    "Ficção Científica",
    "Romance",
    "Tecnologia", 
    "História",
  ]

  console.log("Criando gêneros...")
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
  console.log("Gêneros criados!")

  // Busca os gêneros criados
  const genreMap = Object.fromEntries(
    (await prisma.genre.findMany()).map((g) => [g.name, g.id])
  )

  if (process.env.NODE_ENV === "development") {
    console.log("Criando livros de exemplo...")
    await prisma.book.createMany({
      skipDuplicates: true,
      data: [
        {
          title: "Dom Casmurro",
          author: "Machado de Assis", 
          year: 1899,
          pages: 256,
          genreId: genreMap["Literatura Brasileira"],
          rating: 5,
          synopsis: "Um clássico da literatura brasileira.",
          status: "LIDO",  // Agora é string normal
          currentPage: 256,
          isbn: "978-8535914849",
          notes: "Capitu traiu ou não traiu?",
        },
        {
          title: "1984",
          author: "George Orwell",
          year: 1949, 
          pages: 328,
          genreId: genreMap["Ficção Científica"],
          rating: 5,
          synopsis: "Uma distopia sobre um regime totalitário.",
          status: "LIDO",  // Agora é string normal
          currentPage: 328,
          isbn: "978-8535902785",
        },
        // ... outros livros (mantenha o mesmo formato)
      ],
    })
    console.log("Livros criados!")
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("🌱 SEED CONCLUÍDO COM SUCESSO!")
  })
  .catch(async (e) => {
    console.error("Erro no seed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })