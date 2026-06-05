import { Star } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { Reveal } from '../ui/Reveal'

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-sm font-semibold text-ocean-700">
      {initials}
    </div>
  )
}

export function GoogleTestimonials() {
  const { t } = useLanguage()

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <GoogleLogo className="h-4 w-4" />
            {t.home.testimonials.badge}
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t.home.testimonials.title}
          </h2>
          <p className="mt-3 text-slate-500">{t.home.testimonials.subtitle}</p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <span className="text-3xl font-bold text-slate-900">{t.home.testimonials.rating}</span>
            <div className="text-left">
              <Stars count={5} />
              <p className="mt-0.5 text-xs text-slate-500">
                {t.home.testimonials.totalReviews} {t.home.testimonials.reviewsLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.testimonials.items.map((review, i) => (
            <Reveal key={review.name} delay={i * 120} variant="up">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.name} />
                    <div>
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <p className="text-xs text-slate-400">{review.date}</p>
                    </div>
                  </div>
                  <GoogleLogo className="h-5 w-5 shrink-0" />
                </div>

                <div className="mt-3">
                  <Stars count={review.rating} />
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{review.text}</p>

                <p className="mt-4 text-xs font-medium text-slate-400">{t.home.testimonials.verified}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
