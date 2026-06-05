import { useParams, useNavigate } from 'react-router-dom'
import { AnimatedLink } from '../components/ui/AnimatedLink'
import { Clock, Users, MapPin, Check, ArrowLeft } from 'lucide-react'
import { getExperienceBySlug } from '../data/experiences'
import { formatPrice } from '../utils/format'
import { useBooking } from '../context/BookingContext'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperience } from '../hooks/useLocalizedExperience'

export function ExperienceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { setSelection } = useBooking()
  const { t, lang } = useLanguage()
  const raw = getExperienceBySlug(slug ?? '')

  if (!raw) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{t.experiences.notFound}</h1>
        <AnimatedLink to="/experiencias" underline className="mt-4 inline-block text-ocean-600">
          {t.experiences.back}
        </AnimatedLink>
      </div>
    )
  }

  return <ExperienceDetailContent experience={raw} lang={lang} t={t} setSelection={setSelection} navigate={navigate} />
}

function ExperienceDetailContent({
  experience: raw,
  lang,
  t,
  setSelection,
  navigate,
}: {
  experience: NonNullable<ReturnType<typeof getExperienceBySlug>>
  lang: 'es' | 'en'
  t: ReturnType<typeof useLanguage>['t']
  setSelection: ReturnType<typeof useBooking>['setSelection']
  navigate: ReturnType<typeof useNavigate>
}) {
  const experience = useLocalizedExperience(raw)

  const handleBook = () => {
    setSelection({ experienceId: experience.id })
    navigate('/reservar')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AnimatedLink to="/experiencias" underline className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean-600 hover:text-ocean-800">
        <ArrowLeft className="h-4 w-4" />
        {t.experiences.back}
      </AnimatedLink>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-100">
          <img
            src={experience.image}
            alt={experience.title}
            className="h-full w-full object-cover aspect-[4/3]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{experience.title}</h1>
          <p className="mt-5 text-slate-500 leading-relaxed">{experience.description}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
              <Clock className="h-4 w-4 text-ocean-600" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
              <Users className="h-4 w-4 text-ocean-600" />
              {t.experiences.max} {experience.capacity}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
              <MapPin className="h-4 w-4 text-ocean-600" />
              {experience.meetingPoint}
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-ocean-100 bg-ocean-50/50 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{t.experiences.adult}</p>
                <p className="text-2xl font-bold text-ocean-700">{formatPrice(experience.priceAdult, lang)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">{t.experiences.child}</p>
                <p className="text-2xl font-bold text-ocean-700">{formatPrice(experience.priceChild, lang)}</p>
              </div>
            </div>
            <button
              onClick={handleBook}
              className="link-tap mt-5 w-full rounded-full bg-gradient-to-r from-ocean-600 to-ocean-500 py-3.5 font-semibold text-white shadow-md shadow-ocean-200 hover:from-ocean-700 hover:to-ocean-600"
            >
              {t.experiences.bookThis}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-900">{t.experiences.highlights}</h2>
          <ul className="mt-4 space-y-3">
            {experience.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-slate-600">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-900">{t.experiences.includes}</h2>
          <ul className="mt-4 space-y-3">
            {experience.includes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-slate-600">
                <Check className="h-4 w-4 text-ocean-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
