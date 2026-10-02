import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, BookOpen, Users, CheckSquare, Eye, Download, RotateCcw } from 'lucide-react'
import { useData } from '../context/dataContext'
import GeneralTab from '../components/admin/GeneralTab'
import ClassesTab from '../components/admin/ClassesTab'
import StudentsTab from '../components/admin/StudentsTab'
import ProgressTab from '../components/admin/ProgressTab'
import { btnGhost } from '../components/admin/ui'

const TABS = [
  { id: 'progress', label: 'Progreso', Icon: CheckSquare, Component: ProgressTab },
  { id: 'classes', label: 'Clases', Icon: BookOpen, Component: ClassesTab },
  { id: 'students', label: 'Estudiantes', Icon: Users, Component: StudentsTab },
  { id: 'general', label: 'General', Icon: Settings, Component: GeneralTab },
]

export default function AdminView() {
  const { data, resetData } = useData()
  const [tab, setTab] = useState('progress')
  const Active = TABS.find((t) => t.id === tab).Component

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    if (window.confirm('Esto reemplaza todos los datos por los de ejemplo. ¿Continuar?')) resetData()
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Panel de administrador</h1>
            <p className="text-sm text-slate-400">{data.className}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className={btnGhost}>
              <Eye size={16} /> Ver vista pública
            </Link>
            <button onClick={downloadJSON} className={btnGhost}>
              <Download size={16} /> Descargar JSON
            </button>
            <button onClick={handleReset} className={btnGhost}>
              <RotateCcw size={16} /> Datos de ejemplo
            </button>
          </div>
        </header>

        <nav className="mb-6 flex gap-1 border-b border-slate-800">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                tab === id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <Active />
      </div>
    </div>
  )
}