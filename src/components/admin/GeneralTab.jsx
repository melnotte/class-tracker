import { useData } from '../../context/dataContext'
import { inputCls, labelCls, card } from './ui'

export default function GeneralTab() {
  const { data, setData } = useData()
  const set = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const setTotal = (value) => {
    const total = Math.max(1, Number(value) || 1)
    set({ totalSessions: total, completedSessions: Math.min(data.completedSessions, total) })
  }

  const setCompleted = (value) => {
    const n = Math.max(0, Number(value) || 0)
    set({ completedSessions: Math.min(n, data.totalSessions) })
  }

  return (
    <div className={`${card} grid max-w-2xl gap-5`}>
      <div>
        <label className={labelCls}>Nombre de la clase</label>
        <input
          className={inputCls}
          value={data.className}
          onChange={(e) => set({ className: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Clases realizadas</label>
          <input
            type="number"
            min="0"
            className={inputCls}
            value={data.completedSessions}
            onChange={(e) => setCompleted(e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Clases totales</label>
          <input
            type="number"
            min="1"
            className={inputCls}
            value={data.totalSessions}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Las zonas verde, amarilla y roja se calculan con las clases que faltan.
        Mientras menos clases queden, más estricta es la comparación con el top 3.
      </p>
    </div>
  )
}