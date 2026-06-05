import { useState } from 'react'
import { Lock, Calendar, Users, Mail, Phone, ChevronDown } from 'lucide-react'
import { useReservations } from '../context/ReservationsContext'
import { getExperienceById } from '../data/experiences'
import { getDayAvailability } from '../data/availability'
import { Badge } from '../components/ui/Badge'
import { formatPrice, formatShortDate } from '../utils/format'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperience } from '../hooks/useLocalizedExperience'
import type { ReservationStatus } from '../types'

const DEMO_PASSWORD = 'admin123'

export function Admin() {
  const { t, lang } = useLanguage()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { reservations, updateStatus } = useReservations()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DEMO_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError(t.admin.wrongPassword)
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <Lock className="mx-auto h-10 w-10 text-ocean-600" />
            <h1 className="mt-4 text-xl font-bold">{t.admin.loginTitle}</h1>
            <p className="mt-1 text-sm text-slate-500">{t.admin.loginHint}</p>
          </div>
          <div className="mt-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.admin.password}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-ocean-500 focus:outline-none focus:ring-1 focus:ring-ocean-500"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-ocean-600 py-2.5 text-sm font-semibold text-white hover:bg-ocean-700"
          >
            {t.admin.access}
          </button>
        </form>
      </div>
    )
  }

  const stats = {
    total: reservations.length,
    confirmadas: reservations.filter((r) => r.status === 'confirmada').length,
    pendientes: reservations.filter((r) => r.status === 'pendiente').length,
    ingresos: reservations
      .filter((r) => r.status === 'confirmada')
      .reduce((sum, r) => sum + r.total, 0),
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{t.admin.title}</h1>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
          {t.admin.demo}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t.admin.totalReservations, value: stats.total },
          { label: t.admin.confirmed, value: stats.confirmadas },
          { label: t.admin.pending, value: stats.pendientes },
          { label: t.admin.revenue, value: formatPrice(stats.ingresos, lang) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">{t.admin.recent}</h2>
        {reservations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            {t.admin.empty}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.reference}</th>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.client}</th>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.experience}</th>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.date}</th>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.total}</th>
                  <th className="px-4 py-3 font-medium text-slate-600">{t.admin.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reservations.map((r) => (
                  <AdminRow key={r.id} reservation={r} updateStatus={updateStatus} lang={lang} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function AdminRow({
  reservation: r,
  updateStatus,
  lang,
}: {
  reservation: ReturnType<typeof useReservations>['reservations'][0]
  updateStatus: ReturnType<typeof useReservations>['updateStatus']
  lang: 'es' | 'en'
}) {
  const { t } = useLanguage()
  const raw = getExperienceById(r.experienceId)
  const exp = raw ? useLocalizedExperience(raw) : undefined
  const dayData = getDayAvailability(r.date)
  const slot = dayData?.slots.find((s) => s.id === r.slotId)

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3 font-mono text-xs">{r.reference}</td>
      <td className="px-4 py-3">
        <p className="font-medium">{r.customer.name}</p>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <Mail className="h-3 w-3" /> {r.customer.email}
        </p>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <Phone className="h-3 w-3" /> {r.customer.phone}
        </p>
      </td>
      <td className="px-4 py-3">{exp?.title}</td>
      <td className="px-4 py-3">
        <p className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-slate-400" />
          {formatShortDate(r.date, lang)}
        </p>
        <p className="text-xs text-slate-500">{slot?.time}</p>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <Users className="h-3 w-3" />
          {r.adults}A {r.children > 0 && `+ ${r.children}N`}
        </p>
      </td>
      <td className="px-4 py-3 font-medium">{formatPrice(r.total, lang)}</td>
      <td className="px-4 py-3">
        <div className="relative">
          <select
            value={r.status}
            onChange={(e) => updateStatus(r.id, e.target.value as ReservationStatus)}
            className="appearance-none rounded-lg border border-slate-200 py-1 pl-2 pr-7 text-xs cursor-pointer"
          >
            <option value="pendiente">{t.status.pendiente}</option>
            <option value="confirmada">{t.status.confirmada}</option>
            <option value="cancelada">{t.status.cancelada}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        </div>
        <Badge status={r.status} className="mt-1">{t.status[r.status]}</Badge>
      </td>
    </tr>
  )
}
