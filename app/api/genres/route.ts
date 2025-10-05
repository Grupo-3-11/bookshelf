import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const genres = await prisma.genre.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })
  return NextResponse.json(genres)
}
