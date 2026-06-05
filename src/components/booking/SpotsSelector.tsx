import { Minus, Plus, Users, Ticket } from 'lucide-react'
import { formatPrice } from '../../utils/format'
import { useLanguage } from '../../context/LanguageContext'
import type { Experience } from '../../types'

interface SpotsSelectorProps {
  experience: Experience
  slotTime?: string
  available: number
  adults: number
  children: number
  total: number
  onAdultsChange: (n: number) => void
  onChildrenChange: (n: number) => void
}

export function SpotsSelector({
  experience,
  slotTime,
  available,
  adults,
  children,
  total,
  onAdultsChange,
  onChildrenChange,
}: SpotsSelectorProps) {
  const { t, lang } = useLanguage()
  const totalPeople = adults + children

  if (!slotTime) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
        <Ticket className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm text-slate-400">{t.booking.selectTimeFirst}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-enter">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sand-100">
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="font-semibold text-slate-800">{t.booking.spotsSection}</h3>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {available} {t.booking.spots}
        </span>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        {t.booking.spotsForTime.replace('{time}', slotTime)}
      </p>

      <div className="space-y-3 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">{t.booking.adults}</p>
            <p className="text-xs text-slate-400">{formatPrice(experience.priceAdult, lang)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="link-tap flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-ocean-300 hover:text-ocean-600"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-lg font-bold text-slate-800">{adults}</span>
            <button
              type="button"
              onClick={() => onAdultsChange(Math.min(available - children, experience.capacity, adults + 1))}
              disabled={totalPeople >= available}
              className="link-tap flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-ocean-300 hover:text-ocean-600 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">{t.booking.children}</p>
            <p className="text-xs text-slate-400">{formatPrice(experience.priceChild, lang)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChildrenChange(Math.max(0, children - 1))}
              className="link-tap flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-ocean-300 hover:text-ocean-600"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-lg font-bold text-slate-800">{children}</span>
            <button
              type="button"
              onClick={() => onChildrenChange(children + 1)}
              disabled={totalPeople >= available}
              className="link-tap flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-ocean-300 hover:text-ocean-600 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-ocean-600 to-ocean-500 px-5 py-3.5 text-white">
        <span className="font-medium">{t.booking.total}</span>
        <span className="text-xl font-bold">{formatPrice(total, lang)}</span>
      </div>
    </div>
  )
}
