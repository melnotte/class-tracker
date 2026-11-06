import { motion } from 'framer-motion'

export default function ProgressBar({ classes, completed, gradient = 'from-cyan-400 to-blue-500' }) {
  const offsets = classes.reduce((acc, c, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + classes[i - 1].activities.length)
    return acc
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {classes.map((c, ci) => (
        <div key={c.id} className="flex gap-1.5">
          {c.activities.map((a, ai) => {
            const n = offsets[ci] + ai + 1
            const done = completed.includes(a.id)
            const label = `${a.name} (${c.title}) · ${a.points} pts · ${done ? 'Entregada' : 'Pendiente'}`
            return (
              <motion.div
                key={a.id}
                title={label}
                aria-label={label}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: n * 0.03 }}
                className={`flex h-8 w-8 select-none items-center justify-center rounded-md text-sm font-bold tabular-nums ${
                  done
                    ? `bg-gradient-to-br ${gradient} text-slate-900`
                    : 'border-2 border-dashed border-slate-600 bg-slate-800/60 text-slate-500'
                }`}
              >
                {n}
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}