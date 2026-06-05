import type { ReactNode } from 'react'
import type { ReservationStatus } from '../../types'

const statusStyles: Record<ReservationStatus, string> = {
  pendiente: 'bg-amber-100 text-amber-800',
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
}

export function Badge({
  children,
  status,
  className = '',
}: {
  children: ReactNode
  status?: ReservationStatus
  className?: string
}) {
  const style = status ? statusStyles[status] : 'bg-ocean-100 text-ocean-800'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style} ${className}`}>
      {children}
    </span>
  )
}
