import { ShieldCheck, TriangleAlert, Siren } from 'lucide-react'

export const ZONES = {
  green: {
    label: 'En ruta',
    Icon: ShieldCheck,
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    bar: 'from-emerald-400 to-green-500',
  },
  yellow: {
    label: 'Atención',
    Icon: TriangleAlert,
    text: 'text-amber-400',
    border: 'border-amber-500/40',
    badge: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    bar: 'from-amber-300 to-orange-500',
  },
  red: {
    label: 'Peligro',
    Icon: Siren,
    text: 'text-red-400',
    border: 'border-red-500/50',
    badge: 'border-red-500/50 bg-red-500/10 text-red-300',
    bar: 'from-red-400 to-rose-600',
  },
}