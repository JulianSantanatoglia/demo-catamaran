import type { DayAvailability } from '../types'

const DEFAULT_SLOTS = [
  { id: 'morning', time: '10:00', available: 14 },
  { id: 'midday', time: '12:30', available: 8 },
  { id: 'afternoon', time: '16:00', available: 16 },
  { id: 'sunset', time: '19:00', available: 6 },
]

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function generateMonthAvailability(year: number, month: number): DayAvailability[] {
  const days: DayAvailability[] = []
  const lastDay = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
    const isClosed = dayOfWeek === 1 || isPast

    days.push({
      date: formatDate(date),
      closed: isClosed,
      slots: isClosed
        ? []
        : DEFAULT_SLOTS.map((s) => ({
            ...s,
            available: Math.max(0, s.available - Math.floor(Math.random() * 5)),
          })),
    })
  }

  return days
}

const now = new Date()
export const availabilityData: DayAvailability[] = [
  ...generateMonthAvailability(now.getFullYear(), now.getMonth()),
  ...generateMonthAvailability(
    now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(),
    (now.getMonth() + 1) % 12,
  ),
]

export function getDayAvailability(date: string): DayAvailability | undefined {
  return availabilityData.find((d) => d.date === date)
}
