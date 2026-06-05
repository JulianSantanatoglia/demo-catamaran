import { ChevronLeft, ChevronRight } from 'lucide-react'
import { availabilityData } from '../../data/availability'
import { useLanguage } from '../../context/LanguageContext'

interface CalendarProps {
  selectedDate: string | null
  onSelectDate: (date: string) => void
  month: number
  year: number
  onMonthChange: (month: number, year: number) => void
}

export function Calendar({ selectedDate, onSelectDate, month, year, onMonthChange }: CalendarProps) {
  const { t, lang } = useLanguage()

  const monthNames =
    lang === 'en'
      ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const weekDays = lang === 'en' ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] : ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  const startOffset = (firstDay.getDay() + 6) % 7

  const prevMonth = () => {
    if (month === 0) onMonthChange(11, year - 1)
    else onMonthChange(month - 1, year)
  }

  const nextMonth = () => {
    if (month === 11) onMonthChange(0, year + 1)
    else onMonthChange(month + 1, year)
  }

  const getDayStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayData = availabilityData.find((d) => d.date === dateStr)
    if (!dayData) return 'unavailable'
    if (dayData.closed) return 'closed'
    const hasSlots = dayData.slots.some((s) => s.available > 0)
    return hasSlots ? 'available' : 'full'
  }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(<div key={`empty-${i}`} />)
  for (let day = 1; day <= lastDay; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const status = getDayStatus(day)
    const isSelected = selectedDate === dateStr

    cells.push(
      <button
        key={day}
        type="button"
        disabled={status === 'closed' || status === 'unavailable' || status === 'full'}
        onClick={() => onSelectDate(dateStr)}
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-colors
          ${isSelected ? 'bg-ocean-600 text-white shadow-sm' : ''}
          ${status === 'available' && !isSelected ? 'hover:bg-ocean-100 text-slate-800' : ''}
          ${status === 'closed' || status === 'unavailable' ? 'text-slate-300 cursor-not-allowed' : ''}
          ${status === 'full' ? 'text-slate-400 cursor-not-allowed line-through' : ''}
        `}
      >
        {day}
      </button>,
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={prevMonth} className="rounded-xl p-1.5 hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-semibold text-slate-800">
          {monthNames[month]} {year}
        </h3>
        <button type="button" onClick={nextMonth} className="rounded-xl p-1.5 hover:bg-slate-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-ocean-600" /> {t.booking.calendar.selected}
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded border border-slate-300" /> {t.booking.calendar.available}
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-slate-200" /> {t.booking.calendar.unavailable}
        </span>
      </div>
    </div>
  )
}
