import { useState } from 'react'
import { useData } from '../../context/dataContext'
import { getStudentStats } from '../../lib/progress'
import { card } from './ui'

export default function ProgressTab() {
  const { data, setData } = useData()
  const [classId, setClassId] = useState(data.classes[0]?.id)

  const current = data.classes.find((c) => c.id === classId) ?? data.classes[0]

  const toggle = (studentId, actId) =>
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) => {
        if (s.id !== studentId) return s
        const has = s.completed.includes(actId)
        return {
          ...s,
          completed: has ? s.completed.filter((id) => id !== actId) : [...s.completed, actId],
        }
      }),
    }))

  if (!current) {
    return <p className="text-slate-400">Primero crea una clase en la pestaña Clases.</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {data.classes.map((c) => (
          <button
            key={c.id}
            onClick={() => setClassId(c.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              c.id === current.id
                ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className={`${card} overflow-x-auto p-0`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400">
              <th className="px-4 py-3 font-semibold">Estudiante</th>
              {current.activities.map((a) => (
                <th key={a.id} className="px-3 py-3 text-center font-semibold">
                  <div>{a.name}</div>
                  <div className="text-xs font-normal text-slate-500">{a.points} pts</div>
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((s) => {
              const { points, percent } = getStudentStats(s, data)
              return (
                <tr key={s.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  {current.activities.map((a) => (
                    <td key={a.id} className="px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer accent-cyan-400"
                        checked={s.completed.includes(a.id)}
                        onChange={() => toggle(s.id, a.id)}
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right tabular-nums text-slate-300">
                    {points} pts ({percent}%)
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {data.students.length === 0 && (
          <p className="p-5 text-sm text-slate-500">No hay estudiantes todavía.</p>
        )}
        {current.activities.length === 0 && (
          <p className="p-5 text-sm text-slate-500">Esta clase no tiene actividades.</p>
        )}
      </div>
    </div>
  )
}