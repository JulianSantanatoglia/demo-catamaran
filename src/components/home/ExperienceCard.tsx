import { AnimatedLink } from '../ui/AnimatedLink'
import { Clock, Users, ArrowRight } from 'lucide-react'
import type { Experience } from '../../types'
import { formatPrice } from '../../utils/format'
import { useLanguage } from '../../context/LanguageContext'

export function ExperienceCard({ experience }: { experience: Experience }) {
  const { t, lang } = useLanguage()

  return (
    <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {experience.featured && (
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ocean-700 shadow-sm backdrop-blur-sm">
            {t.experiences.popular}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900">{experience.title}</h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">{experience.shortDescription}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {t.experiences.max} {experience.capacity}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <span className="text-xs text-slate-400">{t.experiences.from}</span>
            <p className="text-xl font-bold text-ocean-700">{formatPrice(experience.priceAdult, lang)}</p>
          </div>
          <AnimatedLink
            to={`/experiencias/${experience.slug}`}
            className="flex items-center gap-1.5 rounded-full bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-700 hover:bg-ocean-100"
          >
            {t.experiences.viewDetail}
            <ArrowRight className="h-4 w-4" />
          </AnimatedLink>
        </div>
      </div>
    </article>
  )
}
