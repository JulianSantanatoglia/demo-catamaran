import { Clock } from 'lucide-react'
import type { TimeSlot } from '../../types'
import { useLanguage } from '../../context/LanguageContext'

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedId?: string
  onSelect: (id: string) => void
}

export function TimeSlotPicker({ slots, selectedId, onSelect }: TimeSlotPickerProps) {
  const { t } = useLanguage()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ocean-100">
          <Clock className="h-4 w-4 text-ocean-600" />
        </div>
        <h3 className="font-semibold text-slate-800">{t.booking.schedule}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const isSelected = selectedId === slot.id
          const isFull = slot.available === 0
          return (
            <button
              key={slot.id}
              type="button"
              disabled={isFull}
              onClick={() => onSelect(slot.id)}
              className={`link-tap rounded-xl border-2 px-3 py-3 text-center transition-all duration-200
                ${isSelected
                  ? 'border-ocean-500 bg-ocean-600 text-white shadow-md shadow-ocean-200 scale-[1.02]'
                  : isFull
                    ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-ocean-300 hover:bg-ocean-50'
                }`}
            >
              <span className="block text-lg font-bold tracking-tight">{slot.time}</span>
              {isFull && (
                <span className="mt-0.5 block text-[10px] font-medium uppercase opacity-70">
                  {t.booking.full}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
