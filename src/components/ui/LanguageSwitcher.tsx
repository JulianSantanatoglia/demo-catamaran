import { useLanguage } from '../../context/LanguageContext'
import type { Lang } from '../../i18n/translations'

function SpainFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#c60b1e" />
      <rect y="4" width="24" height="8" fill="#ffc400" />
    </svg>
  )
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.2" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="4" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.2" />
    </svg>
  )
}

const flags: Record<Lang, typeof SpainFlag> = { es: SpainFlag, en: UKFlag }
const labels: Record<Lang, string> = { es: 'ES', en: 'EN' }

export function LanguageSwitcher({ light }: { light?: boolean }) {
  const { lang, setLang } = useLanguage()
  const Flag = flags[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  return (
    <button
      type="button"
      onClick={() => setLang(other)}
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all
        ${light
          ? 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm border border-white/20'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
        }`}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      title={lang === 'es' ? 'English' : 'Español'}
    >
      <Flag className="h-3.5 w-5 rounded-sm overflow-hidden shadow-sm" />
      <span>{labels[lang]}</span>
    </button>
  )
}
