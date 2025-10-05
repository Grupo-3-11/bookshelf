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

  // Cria os gêneros se ainda não existem
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  // Busca os gêneros com seus IDs
  const genreMap = Object.fromEntries(
    (await prisma.genre.findMany()).map((g) => [g.name, g.id])
  )

  // Só insere livros mock se for dev
  if (process.env.NODE_ENV === "development") {
    await prisma.book.createMany({
      data: [
        {
          title: "Dom Casmurro",
          author: "Machado de Assis",
          year: 1899,
          pages: 256,
          genreId: genreMap["Literatura Brasileira"],
          rating: 5,
          synopsis: "Um clássico da literatura brasileira.",
          status: "LIDO",
        },
        {
          title: "1984",
          author: "George Orwell",
          year: 1949,
          pages: 328,
          genreId: genreMap["Ficção Científica"],
          rating: 5,
          synopsis: "Uma distopia sobre um regime totalitário.",
          status: "LIDO",
        },
        {
          title: "Clean Code",
          author: "Robert C. Martin",
          year: 2008,
          pages: 464,
          genreId: genreMap["Tecnologia"],
          rating: 4,
          synopsis: "Práticas de programação limpa.",
          status: "LENDO",
        },
        {
          title: "Orgulho e Preconceito",
          author: "Jane Austen",
          year: 1813,
          pages: 432,
          genreId: genreMap["Romance"],
          rating: 4,
          synopsis: "Um romance clássico da literatura inglesa.",
          status: "QUERO_LER",
        },
        {
          title: "Sapiens: Uma Breve História da Humanidade",
          author: "Yuval Noah Harari",
          year: 2011,
          pages: 443,
          genreId: genreMap["História"],
          rating: 5,
          synopsis: "Um olhar sobre a evolução da humanidade.",
          status: "QUERO_LER",
        },
      ],
    })
  }
}

main()
  .then(() => {
    console.log("🌱 Seed concluído com sucesso")
  })
  .catch((e) => {
    console.error("Erro no seed:", e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
