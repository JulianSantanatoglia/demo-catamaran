import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LanguageProvider } from './context/LanguageContext'
import { BookingProvider } from './context/BookingContext'
import { ReservationsProvider } from './context/ReservationsContext'
import { Home } from './pages/Home'
import { Experiences } from './pages/Experiences'
import { ExperienceDetail } from './pages/ExperienceDetail'
import { Booking } from './pages/Booking'
import { Payment } from './pages/Payment'
import { Confirmation } from './pages/Confirmation'
import { About } from './pages/About'
import { FAQ } from './pages/FAQ'
import { Contact } from './pages/Contact'
import { AvisoLegal, Privacidad, Cookies } from './pages/Legal'
import { Admin } from './pages/Admin'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ReservationsProvider>
          <BookingProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="experiencias" element={<Experiences />} />
                <Route path="experiencias/:slug" element={<ExperienceDetail />} />
                <Route path="reservar" element={<Booking />} />
                <Route path="reservar/pago" element={<Payment />} />
                <Route path="reservar/confirmacion/:id" element={<Confirmation />} />
                <Route path="sobre-nosotros" element={<About />} />
                <Route path="preguntas-frecuentes" element={<FAQ />} />
                <Route path="contacto" element={<Contact />} />
                <Route path="aviso-legal" element={<AvisoLegal />} />
                <Route path="privacidad" element={<Privacidad />} />
                <Route path="cookies" element={<Cookies />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
          </BookingProvider>
        </ReservationsProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}
