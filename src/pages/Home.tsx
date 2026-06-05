import { AnimatedLink } from '../components/ui/AnimatedLink'
import { Anchor, Calendar, CreditCard, Shield, Star, MapPin, Sparkles } from 'lucide-react'
import { experiences } from '../data/experiences'
import { ExperienceCard } from '../components/home/ExperienceCard'
import { company } from '../data/company'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperiences } from '../hooks/useLocalizedExperience'

export function Home() {
  const { t } = useLanguage()
  const localized = useLocalizedExperiences(experiences.filter((e) => e.featured))
  const featureIcons = [Calendar, CreditCard, Shield, Star]

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/imagen/caladeenmedio.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/40 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-32 sm:pt-36">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4" />
            {t.home.eyebrow}
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
            {t.home.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <AnimatedLink
              to="/reservar"
              className="rounded-full bg-white px-8 py-3.5 font-semibold text-ocean-800 shadow-xl shadow-black/20 hover:bg-ocean-50"
            >
              {t.home.bookNow}
            </AnimatedLink>
            <AnimatedLink
              to="/experiencias"
              className="rounded-full border-2 border-white/60 px-8 py-3.5 font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              {t.home.viewExperiences}
            </AnimatedLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.features.map((item, i) => {
            const Icon = featureIcons[i]
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-50 transition-colors group-hover:bg-ocean-100">
                  <Icon className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.home.experiencesTitle}
            </h2>
            <p className="mt-3 text-slate-500">{t.home.experiencesSubtitle}</p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {localized.map((exp) => (
              <div key={exp.id} className="w-full max-w-sm">
                <ExperienceCard experience={exp} />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <AnimatedLink
              to="/experiencias"
              className="inline-flex items-center gap-2 rounded-full bg-ocean-50 px-6 py-2.5 text-sm font-semibold text-ocean-700 hover:bg-ocean-100"
            >
              {t.home.viewAll} →
            </AnimatedLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.home.embarkTitle}</h2>
            <p className="mt-4 text-slate-500 leading-relaxed">{t.home.embarkDesc}</p>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-ocean-50 p-4 text-slate-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ocean-600" />
              <span>{company.address}</span>
            </div>
            <AnimatedLink
              to="/contacto"
              underline
              className="mt-6 inline-flex items-center gap-1 font-semibold text-ocean-600 hover:text-ocean-800"
            >
              {t.home.howToGet} →
            </AnimatedLink>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-100">
            <iframe
              title="Ubicación punto de embarque"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${company.coordinates.lng - 0.01}%2C${company.coordinates.lat - 0.01}%2C${company.coordinates.lng + 0.01}%2C${company.coordinates.lat + 0.01}&layer=mapnik&marker=${company.coordinates.lat}%2C${company.coordinates.lng}`}
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ocean-700 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Anchor className="mx-auto h-10 w-10 opacity-80" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{t.home.ctaTitle}</h2>
          <p className="mt-4 text-ocean-100 leading-relaxed">{t.home.ctaDesc}</p>
          <AnimatedLink
            to="/reservar"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-ocean-800 shadow-lg hover:bg-ocean-50"
          >
            {t.home.ctaButton}
          </AnimatedLink>
        </div>
      </section>
    </>
  )
}
