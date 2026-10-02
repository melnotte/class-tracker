export const ZONE_CONFIG = {
  referenceTop: 3,    // con cuántos primeros se compara
  greenMargin: 20,    // diferencia máxima (puntos %) para ser verde, al inicio del curso
  yellowMargin: 40,   // diferencia máxima para ser amarillo, al inicio del curso
  minFactor: 0.25,    // los márgenes nunca bajan de este porcentaje del original
}

export function getAllActivities(data) {
  return data.classes.flatMap((c) => c.activities)
}

export function getTotalPoints(data) {
  return getAllActivities(data).reduce((sum, a) => sum + a.points, 0)
}

export function getStudentStats(student, data) {
  const activities = getAllActivities(data)
  const total = getTotalPoints(data)
  const points = activities
    .filter((a) => student.completed.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0)
  const percent = total > 0 ? Math.round((points / total) * 100) : 0
  return { points, percent }
}

function getZone(rank, percent, sorted, data) {
  const { referenceTop, greenMargin, yellowMargin, minFactor } = ZONE_CONFIG

  if (rank <= referenceTop) return { zone: 'green', gap: 0 }

  const top = sorted.slice(0, referenceTop)
  const reference = top.reduce((sum, s) => sum + s.percent, 0) / top.length
  const gap = Math.max(0, Math.round(reference - percent))

  const remaining = Math.max(data.totalSessions - data.completedSessions, 0)
  const factor = Math.max(remaining / data.totalSessions, minFactor)

  if (gap <= greenMargin * factor) return { zone: 'green', gap }
  if (gap <= yellowMargin * factor) return { zone: 'yellow', gap }
  return { zone: 'red', gap }
}

export function getRanking(data) {
  const sorted = data.students
    .map((s) => ({ ...s, ...getStudentStats(s, data) }))
    .sort((a, b) => b.points - a.points)

  return sorted.map((s, i) => ({
    ...s,
    rank: i + 1,
    ...getZone(i + 1, s.percent, sorted, data),
  }))
}