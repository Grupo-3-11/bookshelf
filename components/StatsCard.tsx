import React from "react"

type Props = {
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
