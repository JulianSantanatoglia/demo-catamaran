import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { AnimatedLink } from '../components/ui/AnimatedLink'

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center animate-enter">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-100">
          <HelpCircle className="h-6 w-6 text-ocean-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.faq.title}</h1>
        <p className="mt-3 text-slate-500">{t.faq.subtitle}</p>
      </div>

      <div className="mt-10 space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`rounded-2xl border bg-white shadow-sm transition-all duration-300
                ${isOpen ? 'border-ocean-200 shadow-md ring-1 ring-ocean-100' : 'border-slate-200 hover:border-slate-300'}
              `}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="link-tap flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-900"
              >
                <span className={isOpen ? 'text-ocean-800' : ''}>{item.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300
                    ${isOpen ? 'bg-ocean-600 text-white rotate-0' : 'bg-slate-100 text-slate-500'}
                  `}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              <div className="faq-content" data-open={isOpen}>
                <div>
                  <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm text-slate-500 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 rounded-2xl bg-ocean-50 p-6 text-center ring-1 ring-ocean-100 animate-enter-scale">
        <p className="font-medium text-slate-900">{t.faq.notFound}</p>
        <p className="mt-1 text-sm text-slate-500">{t.faq.contactUs}</p>
        <AnimatedLink
          to="/contacto"
          className="mt-4 inline-block rounded-full bg-ocean-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ocean-700"
        >
          {t.faq.contact}
        </AnimatedLink>
      </div>
    </div>
  )
}
