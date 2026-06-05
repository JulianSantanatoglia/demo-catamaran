import { createContext, useContext, useState, type ReactNode } from 'react'
import type { BookingSelection } from '../types'

interface BookingContextType {
  selection: Partial<BookingSelection>
  setSelection: (data: Partial<BookingSelection>) => void
  clearSelection: () => void
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selection, setSelectionState] = useState<Partial<BookingSelection>>({})

  const setSelection = (data: Partial<BookingSelection>) => {
    setSelectionState((prev) => ({ ...prev, ...data }))
  }

  const clearSelection = () => setSelectionState({})

  return (
    <BookingContext.Provider value={{ selection, setSelection, clearSelection }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
