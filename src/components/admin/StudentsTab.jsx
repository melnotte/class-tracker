import { useState } from 'react'
import { UserPlus, Trash2 } from 'lucide-react'
import { useData } from '../../context/dataContext'
import { uid } from '../../lib/id'
import { inputCls, labelCls, btnPrimary, btnDanger, card } from './ui'

export default function StudentsTab() {
  const { data, setData } = useData()
  const [name, setName] = useState('')

  const addStudent = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setData((prev) => ({
      ...prev,
      students: [...prev.students, { id: uid('s'), name: trimmed, portfolioUrl: '', completed: [] }],
    }))
    setName('')
  }

  const updateStudent = (id, patch) =>
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))

  const deleteStudent = (student) => {
    if (!window.confirm(`¿Eliminar a ${student.name}?`)) return
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== student.id),
    }))
  }

  return (
    <div className="space-y-5">
      <form onSubmit={addStudent} className={`${card} flex items-end gap-3`}>
        <div className="flex-1">
          <label className={labelCls}>Nuevo estudiante</label>
          <input
            className={inputCls}
            placeholder="Nombre o apodo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className={btnPrimary}>
          <UserPlus size={16} /> Agregar
        </button>
      </form>

      <div className={`${card} space-y-3`}>
        <div className="grid grid-cols-[1fr_2fr_auto] gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span>Nombre</span>
          <span>Link del portafolio</span>
          <span className="w-9" />
        </div>
        {data.students.map((s) => (
          <div key={s.id} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
            <input
              className={inputCls}
              value={s.name}
              onChange={(e) => updateStudent(s.id, { name: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="https://..."
              value={s.portfolioUrl}
              onChange={(e) => updateStudent(s.id, { portfolioUrl: e.target.value })}
            />
            <button className={btnDanger} onClick={() => deleteStudent(s)} title="Eliminar">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {data.students.length === 0 && (
          <p className="text-sm text-slate-500">Agrega tu primer estudiante arriba.</p>
        )}
      </div>
    </div>
  )
}