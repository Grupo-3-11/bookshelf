type Props = {
    title: string
    value: number
  }
  
  export function StatsCard({ title, value }: Props) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <h3 className="text-gray-500">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    )
  }
  