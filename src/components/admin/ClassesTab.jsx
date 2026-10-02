import { Plus, Trash2 } from 'lucide-react'
import { useData } from '../../context/dataContext'
import { uid } from '../../lib/id'
import { inputBase, inputCls, btnPrimary, btnGhost, btnDanger, card } from './ui'

function stripActivities(students, ids) {
  return students.map((s) => ({
    ...s,
    completed: s.completed.filter((id) => !ids.includes(id)),
  }))
}

export default function ClassesTab() {
  const { data, setData } = useData()

  const updateClass = (classId, patch) =>
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((c) => (c.id === classId ? { ...c, ...patch } : c)),
    }))

  const addClass = () =>
    setData((prev) => ({
      ...prev,
      classes: [
        ...prev.classes,
        { id: uid('c'), title: `Clase ${prev.classes.length + 1}`, activities: [] },
      ],
    }))

  const deleteClass = (cls) => {
    if (!window.confirm(`¿Eliminar "${cls.title}" y sus actividades?`)) return
    const ids = cls.activities.map((a) => a.id)
    setData((prev) => ({
      ...prev,
      classes: prev.classes.filter((c) => c.id !== cls.id),
      students: stripActivities(prev.students, ids),
    }))
  }

  const addActivity = (classId) =>
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((c) =>
        c.id === classId
          ? { ...c, activities: [...c.activities, { id: uid('a'), name: 'Nueva actividad', points: 10 }] }
          : c,
      ),
    }))

  const updateActivity = (classId, actId, patch) =>
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((c) =>
        c.id === classId
          ? { ...c, activities: c.activities.map((a) => (a.id === actId ? { ...a, ...patch } : a)) }
          : c,
      ),
    }))

  const deleteActivity = (classId, actId) =>
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((c) =>
        c.id === classId ? { ...c, activities: c.activities.filter((a) => a.id !== actId) } : c,
      ),
      students: stripActivities(prev.students, [actId]),
    }))

  return (
    <div className="space-y-5">
      {data.classes.map((cls) => (
        <div key={cls.id} className={card}>
          <div className="mb-4 flex items-center gap-3">
            <input
              className={`${inputCls} text-base font-semibold`}
              value={cls.title}
              onChange={(e) => updateClass(cls.id, { title: e.target.value })}
            />
            <button className={btnDanger} onClick={() => deleteClass(cls)} title="Eliminar clase">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-2">
            {cls.activities.map((act) => (
              <div key={act.id} className="flex items-center gap-3">
                <input
                    className={`${inputBase} min-w-0 flex-1`}
                    value={act.name}
                    onChange={(e) => updateActivity(cls.id, act.id, { name: e.target.value })}
                />
                <input
                    type="number"
                    min="0"
                    className={`${inputBase} w-24 shrink-0`}
                    value={act.points}
                    onChange={(e) =>
                        updateActivity(cls.id, act.id, { points: Math.max(0, Number(e.target.value) || 0) })
                    }
                />
                <span className="text-xs text-slate-500">pts</span>
                <button
                  className={btnDanger}
                  onClick={() => deleteActivity(cls.id, act.id)}
                  title="Eliminar actividad"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {cls.activities.length === 0 && (
              <p className="text-sm text-slate-500">Esta clase aún no tiene actividades.</p>
            )}
          </div>

          <button className={`${btnGhost} mt-4`} onClick={() => addActivity(cls.id)}>
            <Plus size={16} /> Agregar actividad
          </button>
        </div>
      ))}

      <button className={btnPrimary} onClick={addClass}>
        <Plus size={16} /> Nueva clase
      </button>
    </div>
  )
}