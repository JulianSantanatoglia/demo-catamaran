import { Check, Compass, CalendarDays, UserRound, CreditCard } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const stepIcons = [Compass, CalendarDays, UserRound, CreditCard]

export function BookingSteps({ current }: { current: number }) {
  const { t } = useLanguage()
  const steps = t.booking.steps.map((label, i) => ({ id: i + 1, label }))
  const progress = ((current - 1) / (steps.length - 1)) * 100

  return (
    <div className="mb-10">
      <div className="relative mx-auto max-w-xl">
        <div className="absolute top-5 left-0 right-0 h-1 rounded-full bg-slate-100" />
        <div
          className="absolute top-5 left-0 h-1 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, i) => {
            const Icon = stepIcons[i]
            const done = current > step.id
            const active = current === step.id
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300
                    ${done ? 'bg-green-500 text-white scale-100 shadow-md shadow-green-200' : ''}
                    ${active ? 'bg-ocean-600 text-white scale-110 shadow-lg shadow-ocean-300 animate-pop' : ''}
                    ${!done && !active ? 'bg-white text-slate-400 ring-2 ring-slate-100' : ''}
                  `}
                >
                  {done ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                </div>
                <span
                  className={`mt-2 hidden max-w-[4.5rem] text-center text-[11px] font-medium leading-tight sm:block
                    ${active ? 'text-ocean-700' : 'text-slate-400'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
