import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Anchor, Menu, X } from 'lucide-react'
import { company } from '../../data/company'
import { useLanguage } from '../../context/LanguageContext'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const { t } = useLanguage()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const progress = Math.min(scrollY / 100, 1)
  const transparent = isHome && progress < 0.85
  const lightText = isHome && progress < 0.4

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/experiencias', label: t.nav.experiences },
    { to: '/sobre-nosotros', label: t.nav.about },
    { to: '/preguntas-frecuentes', label: t.nav.faq },
    { to: '/contacto', label: t.nav.contact },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: transparent
          ? `rgba(255, 255, 255, ${progress * 0.92})`
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: progress > 0.05 || !isHome ? 'blur(12px)' : 'none',
        borderBottom: progress > 0.7 || !isHome ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        boxShadow: progress > 0.8 || !isHome ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link
          to="/"
          className={`link-tap flex items-center gap-2.5 transition-colors ${lightText ? 'text-white' : 'text-ocean-800'}`}
        >
          <div className={`rounded-xl p-1.5 transition-colors ${lightText ? 'bg-white/15' : 'bg-ocean-50'}`}>
            <Anchor className={`h-5 w-5 ${lightText ? 'text-white' : 'text-ocean-600'}`} />
          </div>
          <span className="text-lg font-bold tracking-tight">{company.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `link-tap rounded-full px-3.5 py-2 text-sm font-medium transition-all
                ${lightText
                  ? isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                  : isActive
                    ? 'bg-ocean-50 text-ocean-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-ocean-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <LanguageSwitcher light={lightText} />
          <Link
            to="/reservar"
            className={`link-tap ml-2 rounded-full px-5 py-2 text-sm font-semibold transition-all
              ${lightText
                ? 'bg-white text-ocean-800 hover:bg-ocean-50 shadow-lg shadow-black/10'
                : 'bg-ocean-600 text-white hover:bg-ocean-700 shadow-sm'
              }`}
          >
            {t.nav.book}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher light={lightText} />
          <button
            className={`rounded-xl p-2 transition-colors ${lightText ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            onClick={() => setOpen(!open)}
            aria-label={t.nav.menu}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t px-4 py-4 md:hidden"
          style={{
            borderColor: lightText ? 'rgba(255,255,255,0.15)' : 'rgba(226, 232, 240, 0.8)',
            backgroundColor: lightText ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `link-tap rounded-xl px-4 py-3 text-sm font-medium transition-colors
                  ${lightText
                    ? isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
                    : isActive ? 'bg-ocean-50 text-ocean-700' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/reservar"
              onClick={() => setOpen(false)}
              className="link-tap mt-2 rounded-xl bg-ocean-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {t.nav.book}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
