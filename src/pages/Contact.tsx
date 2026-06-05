import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { company } from '../data/company'
import { useLanguage } from '../context/LanguageContext'

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.contact.title}</h1>
        <p className="mt-3 text-slate-500">{t.contact.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {[
            { icon: Phone, label: t.contact.phone, value: company.phone, href: `tel:${company.phone}` },
            { icon: Mail, label: t.contact.email, value: company.email, href: `mailto:${company.email}` },
            { icon: MapPin, label: t.contact.embark, value: company.address },
            { icon: Clock, label: t.contact.hours, value: company.hours },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-ocean-50 p-3">
                <item.icon className="h-5 w-5 text-ocean-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-medium text-slate-900 hover:text-ocean-600">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium text-slate-900">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-100">
            <iframe
              title="Mapa ubicación"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${company.coordinates.lng - 0.01}%2C${company.coordinates.lat - 0.01}%2C${company.coordinates.lng + 0.01}%2C${company.coordinates.lat + 0.01}&layer=mapnik&marker=${company.coordinates.lat}%2C${company.coordinates.lng}`}
              className="h-56 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <Send className="h-12 w-12 text-green-500" />
              <h2 className="mt-4 text-xl font-bold">{t.contact.sentTitle}</h2>
              <p className="mt-2 text-slate-500">{t.contact.sentDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-semibold">{t.contact.formTitle}</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.name}</label>
                <input required className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-ocean-500 focus:outline-none focus:ring-1 focus:ring-ocean-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.email}</label>
                <input type="email" required className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-ocean-500 focus:outline-none focus:ring-1 focus:ring-ocean-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.message}</label>
                <textarea required rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-ocean-500 focus:outline-none focus:ring-1 focus:ring-ocean-500" />
              </div>
              <button type="submit" className="w-full rounded-full bg-ocean-600 py-2.5 text-sm font-semibold text-white hover:bg-ocean-700">
                {t.contact.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
