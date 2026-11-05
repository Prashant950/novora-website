import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon, SparklesIcon } from './Icons'

const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=85'

export default function Hero({ eyebrow, title, text, cta = true, image = defaultImage, slides = [] }) {
  const [active, setActive] = useState(0)
  const isCarousel = slides.length > 1

  // Normalize slides
  const allSlides = isCarousel ? slides : [{ eyebrow, title, text, image }]
  const current = allSlides[active] || allSlides[0]

  useEffect(() => {
    if (!isCarousel) return undefined
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const timer = window.setInterval(() => {
      setActive(prev => (prev + 1) % allSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [isCarousel, allSlides.length])

  const handlePrev = () => {
    setActive(prev => (prev === 0 ? allSlides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActive(prev => (prev + 1) % allSlides.length)
  }

  return (
    <section className="hero relative isolate flex min-h-[calc(100dvh-72px)] sm:min-h-[calc(100vh-80px)] lg:min-h-[660px] items-center justify-center overflow-hidden bg-neutral-900 text-white">
      {/* Stacked Images for Silky Smooth Crossfade */}
      {allSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            active === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url("${slide.image || defaultImage}")`,
          }}
          aria-hidden={active !== index}
        />
      ))}

      {/* Uniform neutral overlay - ZERO left/right/top/bottom black shadows/gradients for crystal clear image view */}
      <div className="absolute inset-0 -z-10 bg-black/35 backdrop-brightness-95" />

      <div className="container-x relative w-full py-24 sm:py-28 lg:py-32 flex flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-left">
          {/* Eyebrow / Pill Badge - HIDE ON MOBILE, SHOW ON TABLET/DESKTOP */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/45 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <SparklesIcon className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs">
              {current.eyebrow}
            </span>
          </div>

          {/* Heading - Prominent & Large in Mobile to Fill Screen */}
          <h1 className="mt-2 sm:mt-4 font-display text-[48px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] sm:leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {current.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] sm:text-lg">
            {current.text}
          </p>

          {/* Side-by-Side CTA Buttons in Mobile (Request on Left, Services on Right) */}
          {cta && (
            <div className="mt-8 flex flex-row items-center gap-3 w-full sm:w-auto">
              {/* Left Button */}
              <Link
                to="/contact"
                className="btn-gold group flex-1 sm:flex-initial text-center justify-center !min-h-12 !px-4 text-xs sm:text-sm font-bold shadow-xl truncate"
              >
                <span>Request a Quote</span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Right Button */}
              <Link
                to="/services"
                className="btn-outline group flex-1 sm:flex-initial text-center justify-center !min-h-12 !px-4 text-xs sm:text-sm font-bold bg-black/40 backdrop-blur-sm truncate"
              >
                <span>Explore Services</span>
                <span className="text-gold shrink-0 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}

          {/* Hero Value Highlights */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 border-t border-white/20 pt-5 text-xs font-medium text-slate-200 sm:justify-start sm:text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Single Point Accountability
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              120,000 Sq.Ft Factory
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Pan-India Rollouts
            </span>
          </div>
        </div>

        {/* Carousel Controls (Mobile shows only clean indicator dots; arrows hidden on mobile) */}
        {isCarousel && (
          <div className="mt-8 flex items-center justify-center gap-3 sm:absolute sm:bottom-10 sm:right-6 sm:mt-0">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {allSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    active === index ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons - HIDE ON MOBILE, SHOW ON TABLET/DESKTOP */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
              >
                <ChevronLeftIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
              >
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
