import { useEffect, useState } from 'react'
import { DataContext } from './dataContext'
import { sampleData } from '../data/sampleData'

const DRAFT_KEY = 'class-tracker-data'

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function DataProvider({ children }) {
  const [published, setPublished] = useState(null)
  const [draft, setDraft] = useState(loadDraft)

  // Leer el data.json publicado
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error('No se pudo leer data.json')
        return r.json()
      })
      .then(setPublished)
      .catch(() => setPublished(sampleData))
  }, [])

  // Guardar o borrar el borrador local
  useEffect(() => {
    if (draft) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    else localStorage.removeItem(DRAFT_KEY)
  }, [draft])

  const data = draft ?? published

  const setData = (updater) =>
    setDraft((prev) => {
      const base = prev ?? published
      return typeof updater === 'function' ? updater(base) : updater
    })

  const resetData = () => setDraft(sampleData)
  const discardDraft = () => setDraft(null)
  const markPublished = () => {
    setPublished(draft)
    setDraft(null)
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando...
      </div>
    )
  }

  return (
    <DataContext.Provider
      value={{ data, setData, resetData, discardDraft, markPublished, dirty: draft !== null }}
    >
      {children}
    </DataContext.Provider>
  )
}