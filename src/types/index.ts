export type ReservationStatus = 'pendiente' | 'confirmada' | 'cancelada'

export interface Experience {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  duration: string
  capacity: number
  priceAdult: number
  priceChild: number
  image: string
  highlights: string[]
  includes: string[]
  meetingPoint: string
  featured?: boolean
}

export interface TimeSlot {
  id: string
  time: string
  available: number
}

export interface DayAvailability {
  date: string
  closed: boolean
  slots: TimeSlot[]
}

export interface CustomerData {
  name: string
  email: string
  phone: string
  notes?: string
}

export interface BookingSelection {
  experienceId: string
  date: string
  slotId: string
  adults: number
  children: number
  customer: CustomerData
}

export interface Reservation extends BookingSelection {
  id: string
  reference: string
  status: ReservationStatus
  total: number
  createdAt: string
  paidAt?: string
}
