import { StatsCard } from "@/components/StatsCard"

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total de Livros" value={5} />
        <StatsCard title="Lendo" value={2} />
        <StatsCard title="Lidos" value={1} />
        <StatsCard title="Páginas Lidas" value={320} />
      </div>
    </div>
  )
}
