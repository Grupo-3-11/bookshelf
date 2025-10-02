type Props = {
<<<<<<< HEAD
    title: string
    value: number
  }
  
  export function StatsCard({ title, value }: Props) {
    return (
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md p-4 text-center">
      <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      </div>

    )
  }
  
=======
  title: string
  value: number
}

export function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md p-4 text-center">
    <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    </div>

  )
}
>>>>>>> 7a86d6169d2c524aae5ab83fa77dc09e3b4c881c
