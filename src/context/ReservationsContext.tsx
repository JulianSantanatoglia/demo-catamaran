import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Reservation, ReservationStatus } from '../types'
import { getExperienceById } from '../data/experiences'

const STORAGE_KEY = 'catamaran-reservations'

interface ReservationsContextType {
  reservations: Reservation[]
  addReservation: (data: Omit<Reservation, 'id' | 'reference' | 'createdAt'>) => Reservation
  updateStatus: (id: string, status: ReservationStatus) => void
  getReservation: (id: string) => Reservation | undefined
}

const ReservationsContext = createContext<ReservationsContextType | null>(null)

function generateReference(): string {
  return `CAT-${Date.now().toString(36).toUpperCase()}`
}

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (
    data: Omit<Reservation, 'id' | 'reference' | 'createdAt'>,
  ): Reservation => {
    const reservation: Reservation = {
      ...data,
      id: crypto.randomUUID(),
      reference: generateReference(),
      createdAt: new Date().toISOString(),
    }
    setReservations((prev) => [reservation, ...prev])
    return reservation
  }

  const updateStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    )
  }

  const getReservation = (id: string) => reservations.find((r) => r.id === id)

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, updateStatus, getReservation }}
    >
      {children}
    </ReservationsContext.Provider>
  )
}

export function useReservations() {
  const ctx = useContext(ReservationsContext)
  if (!ctx) throw new Error('useReservations must be used within ReservationsProvider')
  return ctx
}

export function calculateTotal(
  experienceId: string,
  adults: number,
  children: number,
): number {
  const exp = getExperienceById(experienceId)
  if (!exp) return 0
  return adults * exp.priceAdult + children * exp.priceChild
}
