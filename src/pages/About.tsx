import { Anchor, Award, Heart, Users } from 'lucide-react'
import { company } from '../data/company'
import { useLanguage } from '../context/LanguageContext'

export function About() {
  const { t } = useLanguage()
  const statIcons = [Anchor, Users, Award, Heart]

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.about.title}</h1>
        <p className="mt-3 text-slate-500">{t.about.subtitle}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-100">
        <img
          src="/imagen/caladeenmedio.avif"
          alt=""
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>

      <div className="mt-10 max-w-none">
        <p className="text-lg text-slate-500 leading-relaxed">
          {t.about.p1.replace('{name}', company.name)}
        </p>
        <p className="mt-4 text-slate-500 leading-relaxed">{t.about.p2}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.about.stats.map((stat, i) => {
          const Icon = statIcons[i]
          return (
            <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto h-6 w-6 text-ocean-600" />
              <p className="mt-3 text-2xl font-bold text-ocean-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
