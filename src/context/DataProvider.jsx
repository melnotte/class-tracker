import { useEffect, useState } from 'react'
import { DataContext } from './dataContext'
import { sampleData } from '../data/sampleData'

const STORAGE_KEY = 'class-tracker-data'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : sampleData
  } catch {
    return sampleData
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const resetData = () => setData(sampleData)

  return (
    <DataContext.Provider value={{ data, setData, resetData }}>
      {children}
    </DataContext.Provider>
  )
}