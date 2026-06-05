import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, Loader2, ShieldCheck, Sparkles } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useReservations, calculateTotal } from '../context/ReservationsContext'
import { getExperienceById } from '../data/experiences'
import { getDayAvailability } from '../data/availability'
import { BookingSteps } from '../components/booking/BookingSteps'
import { formatPrice, formatDate } from '../utils/format'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperience } from '../hooks/useLocalizedExperience'
import type { Experience } from '../types'

export function Payment() {
  const navigate = useNavigate()
  const { selection } = useBooking()
  const raw = selection.experienceId ? getExperienceById(selection.experienceId) : undefined

  useEffect(() => {
    if (!raw || !selection.date || !selection.slotId || !selection.customer) {
      navigate('/reservar')
    }
  }, [raw, selection, navigate])

  if (!raw || !selection.date || !selection.slotId || !selection.customer) return null

  return <PaymentForm raw={raw} />
}

function PaymentForm({ raw }: { raw: Experience }) {
  const navigate = useNavigate()
  const { selection, clearSelection } = useBooking()
  const { addReservation } = useReservations()
  const { t, lang } = useLanguage()
  const experience = useLocalizedExperience(raw)
  const [processing, setProcessing] = useState(false)

  const dayData = selection.date ? getDayAvailability(selection.date) : null
  const slot = dayData?.slots.find((s) => s.id === selection.slotId)
  const total = calculateTotal(experience.id, selection.adults ?? 1, selection.children ?? 0)
  const adults = selection.adults ?? 1
  const children = selection.children ?? 0

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 2000))

    const reservation = addReservation({
      experienceId: experience.id,
      date: selection.date!,
      slotId: selection.slotId!,
      adults,
      children,
      customer: selection.customer!,
      status: 'confirmada',
      total,
      paidAt: new Date().toISOString(),
    })

    clearSelection()
    navigate(`/reservar/confirmacion/${reservation.id}`)
  }

  return (
    <div className="booking-bg min-h-screen pb-16">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <BookingSteps current={4} />

        <div className="mt-8 grid gap-8 lg:grid-cols-5 animate-enter">
          <div className="lg:col-span-3 space-y-5">
            {/* Card visual mockup */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-800 p-6 text-white shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Sparkles className="h-6 w-6 opacity-80" />
                  <span className="text-xs font-medium uppercase tracking-widest opacity-70">Demo</span>
                </div>
                <p className="mt-8 font-mono text-xl tracking-[0.2em]">•••• •••• •••• 4242</p>
                <div className="mt-6 flex justify-between text-sm">
                  <div>
                    <p className="text-[10px] uppercase opacity-60">{t.payment.cardHolder}</p>
                    <p className="font-medium">{selection.customer?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase opacity-60">{t.payment.expiry}</p>
                    <p className="font-medium">12/28</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-ocean-600" />
                <h2 className="text-lg font-semibold">{t.payment.title}</h2>
                <span className="ml-auto rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-700">
                  {t.payment.testMode}
                </span>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.payment.cardHolder}</label>
                  <input
                    required
                    defaultValue={selection.customer?.name}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.payment.cardNumber}</label>
                  <input
                    required
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-mono transition-all focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.payment.expiry}</label>
                    <input required placeholder="MM/AA" defaultValue="12/28" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.payment.cvc}</label>
                    <input required placeholder="123" defaultValue="123" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="link-tap mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ocean-600 to-ocean-500 py-4 text-base font-bold text-white shadow-lg shadow-ocean-200 hover:from-ocean-700 hover:to-ocean-600 disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t.payment.processing}
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      {t.payment.pay} {formatPrice(total, lang)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  {t.payment.secure}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl overflow-hidden shadow-lg ring-1 ring-ocean-100 animate-enter-scale">
              <div className="bg-gradient-to-br from-ocean-600 to-ocean-700 px-6 py-4 text-white">
                <h3 className="font-bold">{t.payment.summary}</h3>
              </div>
              <div className="bg-white p-6">
                <img src={experience.image} alt="" className="mb-4 h-28 w-full rounded-2xl object-cover" />
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-400">{t.payment.experience}</dt>
                    <dd className="font-semibold text-right text-slate-800">{experience.title}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">{t.payment.date}</dt>
                    <dd className="font-medium capitalize">{formatDate(selection.date!, lang)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">{t.payment.time}</dt>
                    <dd className="font-medium">{slot?.time}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">{t.payment.persons}</dt>
                    <dd className="font-medium">
                      {adults} {adults > 1 ? t.payment.adults : t.payment.adult}
                      {children > 0 && `, ${children} ${children > 1 ? t.payment.children : t.payment.child}`}
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 flex justify-between rounded-2xl bg-ocean-50 px-4 py-3 font-bold">
                  <span className="text-slate-700">{t.booking.total}</span>
                  <span className="text-xl text-ocean-700">{formatPrice(total, lang)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
