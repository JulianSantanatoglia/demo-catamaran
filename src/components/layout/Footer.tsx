import { AnimatedLink } from '../ui/AnimatedLink'
import { Anchor, MessageCircle } from 'lucide-react'
import { company } from '../../data/company'
import { useLanguage } from '../../context/LanguageContext'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ocean-900 text-ocean-100">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Anchor className="h-6 w-6" />
              <span className="font-bold text-white">{company.name}</span>
            </div>
            <p className="text-sm text-ocean-200">{t.company.tagline}</p>
            <div className="mt-4 flex gap-3">
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="link-tap hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="link-tap hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-tap hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li><AnimatedLink to="/experiencias" underline className="hover:text-white transition-colors">{t.nav.experiences}</AnimatedLink></li>
              <li><AnimatedLink to="/reservar" underline className="hover:text-white transition-colors">{t.nav.book}</AnimatedLink></li>
              <li><AnimatedLink to="/sobre-nosotros" underline className="hover:text-white transition-colors">{t.nav.about}</AnimatedLink></li>
              <li><AnimatedLink to="/contacto" underline className="hover:text-white transition-colors">{t.nav.contact}</AnimatedLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm">
              <li>{company.phone}</li>
              <li>{company.email}</li>
              <li className="text-ocean-200">{company.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><AnimatedLink to="/aviso-legal" underline className="hover:text-white transition-colors">{t.footer.legalNotice}</AnimatedLink></li>
              <li><AnimatedLink to="/privacidad" underline className="hover:text-white transition-colors">{t.footer.privacy}</AnimatedLink></li>
              <li><AnimatedLink to="/cookies" underline className="hover:text-white transition-colors">{t.footer.cookies}</AnimatedLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ocean-800 pt-6 text-center text-sm text-ocean-300">
          © {new Date().getFullYear()} {company.name}. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
