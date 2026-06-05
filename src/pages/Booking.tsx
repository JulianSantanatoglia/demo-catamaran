import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { experiences } from '../data/experiences'
import { getDayAvailability } from '../data/availability'
import { useBooking } from '../context/BookingContext'
import { calculateTotal } from '../context/ReservationsContext'
import { BookingSteps } from '../components/booking/BookingSteps'
import { Calendar } from '../components/booking/Calendar'
import { TimeSlotPicker } from '../components/booking/TimeSlotPicker'
import { SpotsSelector } from '../components/booking/SpotsSelector'
import { formatPrice } from '../utils/format'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperiences } from '../hooks/useLocalizedExperience'

export function Booking() {
  const navigate = useNavigate()
  const { selection, setSelection } = useBooking()
  const { t, lang } = useLanguage()
  const localizedExperiences = useLocalizedExperiences(experiences)
  const now = new Date()

  const [step, setStep] = useState(selection.experienceId ? 2 : 1)
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const experience = localizedExperiences.find((e) => e.id === selection.experienceId)
  const dayData = selection.date ? getDayAvailability(selection.date) : null
  const selectedSlot = dayData?.slots.find((s) => s.id === selection.slotId)
  const total =
    experience && selection.adults !== undefined
      ? calculateTotal(experience.id, selection.adults ?? 1, selection.children ?? 0)
      : 0

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    setSelection({
      customer: {
        name: data.get('name') as string,
        email: data.get('email') as string,
        phone: data.get('phone') as string,
        notes: (data.get('notes') as string) || undefined,
      },
    })
    navigate('/reservar/pago')
  }

  return (
    <div className="booking-bg min-h-screen pb-16">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center animate-enter">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-700 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            {t.booking.subtitle}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.booking.title}</h1>
        </div>

        <div className="mt-8">
          <BookingSteps current={step} />
        </div>

        {step === 1 && (
          <div key="step-1" className="animate-enter space-y-5">
            <h2 className="text-lg font-semibold text-slate-800">{t.booking.step1}</h2>
            <div className="flex flex-wrap justify-center gap-5">
              {localizedExperiences.map((exp, i) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => {
                    setSelection({ experienceId: exp.id, adults: 1, children: 0 })
                    setStep(2)
                  }}
                  className={`link-tap group w-full max-w-sm overflow-hidden rounded-3xl border-2 bg-white text-left shadow-sm transition-all duration-300 hover:shadow-xl
                    ${selection.experienceId === exp.id ? 'border-ocean-500 ring-4 ring-ocean-100' : 'border-transparent hover:border-ocean-200'}
                  `}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={exp.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ocean-700 backdrop-blur-sm">
                      {t.experiences.from} {formatPrice(exp.priceAdult, lang)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900">{exp.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{exp.shortDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ocean-600 group-hover:gap-2 transition-all">
                      {t.booking.continue} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && experience && (
          <div key="step-2" className="animate-enter space-y-6">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <img src={experience.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-medium text-ocean-600 uppercase tracking-wide">{t.booking.steps[0]}</p>
                <p className="font-semibold text-slate-900">{experience.title}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Calendar
                selectedDate={selection.date ?? null}
                onSelectDate={(date) => setSelection({ date, slotId: undefined })}
                month={month}
                year={year}
                onMonthChange={(m, y) => {
                  setMonth(m)
                  setYear(y)
                }}
              />

              <div className="space-y-5">
                {selection.date && dayData && !dayData.closed && (
                  <>
                    <TimeSlotPicker
                      slots={dayData.slots}
                      selectedId={selection.slotId}
                      onSelect={(id) => setSelection({ slotId: id })}
                    />
                    <SpotsSelector
                      experience={experience}
                      slotTime={selectedSlot?.time}
                      available={selectedSlot?.available ?? 0}
                      adults={selection.adults ?? 1}
                      children={selection.children ?? 0}
                      total={total}
                      onAdultsChange={(n) => setSelection({ adults: n })}
                      onChildrenChange={(n) => setSelection({ children: n })}
                    />
                  </>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="link-tap inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.booking.back}
                  </button>
                  <button
                    type="button"
                    disabled={!selection.date || !selection.slotId}
                    onClick={() => setStep(3)}
                    className="link-tap flex flex-1 items-center justify-center gap-2 rounded-full bg-ocean-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-ocean-200 hover:bg-ocean-700 disabled:opacity-50 disabled:shadow-none"
                  >
                    {t.booking.continue}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && experience && (
          <form key="step-3" onSubmit={handleContinueToPayment} className="animate-enter mx-auto max-w-lg space-y-5">
            <h2 className="text-lg font-semibold text-slate-800">{t.booking.step3}</h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              {[
                { name: 'name', label: t.booking.name, type: 'text', icon: User },
                { name: 'email', label: t.booking.email, type: 'email', icon: Mail },
                { name: 'phone', label: t.booking.phone, type: 'tel', icon: Phone },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <field.icon className="h-3.5 w-3.5 text-ocean-500" />
                    {field.label} *
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    defaultValue={selection.customer?.[field.name as keyof typeof selection.customer] as string}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-colors focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <MessageSquare className="h-3.5 w-3.5 text-ocean-500" />
                  {t.booking.notes}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  defaultValue={selection.customer?.notes}
                  placeholder={t.booking.notesPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-colors focus:border-ocean-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-100"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="link-tap inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.booking.back}
              </button>
              <button
                type="submit"
                className="link-tap flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ocean-600 to-ocean-500 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean-200 hover:from-ocean-700 hover:to-ocean-600"
              >
                {t.booking.goToPayment}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
