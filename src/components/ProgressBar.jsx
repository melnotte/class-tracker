import { motion } from 'framer-motion'

export default function ProgressBar({ percent, gradient = 'from-cyan-400 to-blue-500' }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}