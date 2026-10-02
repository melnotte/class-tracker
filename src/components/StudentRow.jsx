import { motion } from 'framer-motion'
import { Crown, ExternalLink } from 'lucide-react'
import ProgressBar from './ProgressBar'
import { ZONES } from '../lib/zones'

export default function StudentRow({ student }) {
  const { rank, zone, gap } = student
  const z = ZONES[zone]
  const isFirst = rank === 1
  const hasPortfolio = Boolean(student.portfolioUrl)

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
      className={`flex items-center gap-4 rounded-xl border bg-slate-900/70 px-4 py-3 ${z.border}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold ${
          isFirst ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300'
        }`}
      >
        {isFirst ? <Crown size={22} /> : rank}
      </div>

      <div className="w-40 shrink-0">
        <div className="truncate text-lg font-semibold">{student.name}</div>
        {gap > 0 && (
          <div className={`text-xs ${z.text}`}>A {gap} pts del top 3</div>
        )}
      </div>

      <div className="flex-1">
        <ProgressBar percent={student.percent} gradient={z.bar} />
      </div>

      <div className="w-16 shrink-0 text-right text-xl font-bold tabular-nums text-white">
        {student.percent}%
      </div>

      <div
        className={`flex w-32 shrink-0 items-center justify-center gap-2 rounded-lg border px-2 py-2 text-sm font-semibold ${z.badge}`}
      >
        <z.Icon size={18} className={zone === 'red' ? 'animate-pulse' : ''} />
        {z.label}
      </div>

      {hasPortfolio ? (
        <a
          href={student.portfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="flex w-36 shrink-0 items-center justify-center gap-2 rounded-lg border border-cyan-500/40 px-3 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/10"
        >
          Portafolio <ExternalLink size={16} />
        </a>
      ) : (
        <span className="flex w-36 shrink-0 items-center justify-center rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-600">
          Sin portafolio
        </span>
      )}
    </motion.div>
  )
}