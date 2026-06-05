import type { Lang } from '../i18n/translations'

const localeMap: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' }

export function formatPrice(amount: number, lang: Lang = 'es'): string {
  return new Intl.NumberFormat(localeMap[lang], {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatDate(dateStr: string, lang: Lang = 'es'): string {
  return new Intl.DateTimeFormat(localeMap[lang], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr + 'T12:00:00'))
}

export function formatShortDate(dateStr: string, lang: Lang = 'es'): string {
  return new Intl.DateTimeFormat(localeMap[lang], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr + 'T12:00:00'))
}
