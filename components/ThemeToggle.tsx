"use client"

import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as any)}
      className="border px-2 py-1 rounded"
    >
      <option value="light">☀️</option>
      <option value="dark">🌙</option>
      <option value="system">💻</option>
    </select>
  )
}
