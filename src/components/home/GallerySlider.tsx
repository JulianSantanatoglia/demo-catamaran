import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../../data/gallery'
import { useLanguage } from '../../context/LanguageContext'
import { Reveal } from '../ui/Reveal'

export function GallerySlider() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (next: number) => setIndex((next + galleryImages.length) % galleryImages.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => goTo(index + 1), 6000)
    return () => window.clearInterval(timer)
  }, [index, paused, goTo])

  const active = galleryImages[index]
  const meta = t.home.gallery.items[active.id as keyof typeof t.home.gallery.items]

  return (
    <Reveal as="section" variant="fade" className="w-full pt-4">
      <div
        className="group relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {galleryImages.map((image) => {
            const item = t.home.gallery.items[image.id as keyof typeof t.home.gallery.items]
            return (
              <div
                key={image.id}
                className="relative h-[clamp(340px,48vh,500px)] w-full shrink-0 overflow-hidden"
              >
                <img
                  src={image.src}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-125 object-cover blur-3xl brightness-[0.55] saturate-[1.4]"
                />
                <div className="absolute inset-0 bg-ocean-950/25" />

                <div className="relative flex h-full items-center justify-center px-14 py-6 sm:px-20">
                  <img
                    src={image.src}
                    alt={item.alt}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <p className="absolute bottom-12 left-6 max-w-lg text-sm font-medium leading-snug text-white/95 sm:bottom-14 sm:left-10 sm:text-base">
                  {item.caption}
                </p>
              </div>
            )
          })}
        </div>

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/25 p-2.5 text-white opacity-100 backdrop-blur-md transition-all hover:bg-black/40 sm:left-5 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={t.home.gallery.prev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/25 p-2.5 text-white opacity-100 backdrop-blur-md transition-all hover:bg-black/40 sm:right-5 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={t.home.gallery.next}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
              {galleryImages.map((image, i) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'h-1 w-5 bg-white'
                      : 'h-1 w-1 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`${meta.alt} (${i + 1}/${galleryImages.length})`}
                />
              ))}
              <span className="ml-2 tabular-nums text-[11px] font-medium text-white/40">
                {index + 1}/{galleryImages.length}
              </span>
            </div>
          </>
        )}
      </div>
    </Reveal>
  )
}
