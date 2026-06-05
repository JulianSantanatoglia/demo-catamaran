import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { ScrollToTop } from '../ui/ScrollToTop'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className={`flex-1 ${isHome ? '' : 'pt-[72px]'}`}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
