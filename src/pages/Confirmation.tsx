import { useParams } from 'react-router-dom'
import { AnimatedLink } from '../components/ui/AnimatedLink'
import { CheckCircle, Mail, Calendar, Clock, Download } from 'lucide-react'
import { useReservations } from '../context/ReservationsContext'
import { getExperienceById } from '../data/experiences'
import { getDayAvailability } from '../data/availability'
import { formatPrice, formatDate } from '../utils/format'
import { Badge } from '../components/ui/Badge'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperience } from '../hooks/useLocalizedExperience'

export function Confirmation() {
  const { id } = useParams()
  const { getReservation } = useReservations()
  const { t } = useLanguage()
  const reservation = id ? getReservation(id) : undefined
  const raw = reservation ? getExperienceById(reservation.experienceId) : undefined

  if (!reservation || !raw) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{t.confirmation.notFound}</h1>
        <AnimatedLink to="/" underline className="mt-4 inline-block text-ocean-600">{t.confirmation.backHome}</AnimatedLink>
      </div>
    )
  }

  return <ConfirmationContent reservation={reservation} raw={raw} />
}

function ConfirmationContent({
  reservation,
  raw,
}: {
  reservation: NonNullable<ReturnType<ReturnType<typeof useReservations>['getReservation']>>
  raw: NonNullable<ReturnType<typeof getExperienceById>>
}) {
  const { t, lang } = useLanguage()
  const experience = useLocalizedExperience(raw)
  const dayData = getDayAvailability(reservation.date)
  const slot = dayData?.slots.find((s) => s.id === reservation.slotId)

  return (
    <div className="booking-bg min-h-screen px-4 py-12">
      <div className="mx-auto max-w-lg animate-enter">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 animate-pop">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{t.confirmation.title}</h1>
        <p className="mt-2 text-slate-500">
          {t.confirmation.sentTo} <strong>{reservation.customer.email}</strong>
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">{t.confirmation.reference}</span>
          <span className="font-mono font-bold text-ocean-700">{reservation.reference}</span>
        </div>
        <Badge status={reservation.status}>{t.status[reservation.status]}</Badge>

        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 mt-0.5 text-ocean-600 shrink-0" />
            <div>
              <dt className="text-slate-500">{t.confirmation.date}</dt>
              <dd className="font-medium capitalize">{formatDate(reservation.date, lang)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 mt-0.5 text-ocean-600 shrink-0" />
            <div>
              <dt className="text-slate-500">{t.confirmation.boarding}</dt>
              <dd className="font-medium">{slot?.time} {t.confirmation.arriveEarly}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 mt-0.5 text-ocean-600 shrink-0" />
            <div>
              <dt className="text-slate-500">{t.confirmation.experience}</dt>
              <dd className="font-medium">{experience.title}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 border-t pt-4 flex justify-between font-bold">
          <span>{t.confirmation.totalPaid}</span>
          <span className="text-ocean-700">{formatPrice(reservation.total, lang)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-ocean-50 p-4 text-sm text-ocean-800">
        <p className="font-medium">{t.confirmation.emailSent}</p>
        <p className="mt-1 text-ocean-700">{t.confirmation.emailDesc}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.print()}
          className="link-tap flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          {t.confirmation.download}
        </button>
        <AnimatedLink
          to="/"
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-ocean-600 to-ocean-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-ocean-700 hover:to-ocean-600"
        >
          {t.confirmation.backHome}
        </AnimatedLink>
      </div>
      </div>
    </div>
  )
}
