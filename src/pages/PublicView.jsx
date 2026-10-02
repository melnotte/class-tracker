import { LayoutGroup } from 'framer-motion'
import { Trophy, CalendarCheck } from 'lucide-react'
import { useData } from '../context/dataContext'
import { getRanking } from '../lib/progress'
import { ZONES } from '../lib/zones'
import StudentRow from '../components/StudentRow'

export default function PublicView() {
  const { data } = useData()
  const ranking = getRanking(data)
  const remaining = data.totalSessions - data.completedSessions

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1 className="rounded-xl border border-slate-700 px-6 py-3 text-3xl font-bold">
            {data.className}
          </h1>
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 px-5 py-3">
            <CalendarCheck className="text-cyan-300" size={28} />
            <div className="leading-tight">
              <div className="text-3xl font-bold tabular-nums">
                {data.completedSessions}/{data.totalSessions}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Clases
              </div>
            </div>
          </div>
        </header>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy size={20} className="text-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-widest">
              Progreso del taller
            </h2>
            <span className="text-sm text-slate-500">
              {remaining > 0 ? `Faltan ${remaining} clases` : 'Taller finalizado'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            {Object.values(ZONES).map((z) => (
              <div key={z.label} className="flex items-center gap-1">
                <z.Icon size={14} className={z.text} />
                {z.label}
              </div>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <div className="space-y-3">
            {ranking.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </div>
        </LayoutGroup>

        {ranking.length === 0 && (
          <p className="py-16 text-center text-slate-500">
            Aún no hay estudiantes registrados.
          </p>
        )}
      </div>
    </div>
  )
}