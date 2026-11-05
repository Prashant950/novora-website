import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=85'

export default function Hero({ eyebrow, title, text, cta = true, image = defaultImage, slides = [] }) {
  const [active, setActive] = useState(0)
  const isCarousel = slides.length > 1
  const current = isCarousel ? slides[active] : { eyebrow, title, text, image }

  useEffect(() => {
    if (!isCarousel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 3000)
    return () => window.clearInterval(timer)
  }, [isCarousel, slides.length])

  return (
    <section className="hero relative isolate flex min-h-[570px] items-center overflow-hidden bg-ink text-white sm:min-h-[650px]">
      <div
        key={active}
        className="hero-image absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${current.image || defaultImage}")` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101827]/95 via-[#101827]/75 to-[#101827]/20" />
      <div className="container-x relative w-full py-24 sm:py-32">
        <div key={`copy-${active}`} className="hero-copy max-w-4xl">
          <p className="eyebrow">{current.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.94] tracking-wide sm:text-7xl lg:text-8xl">{current.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{current.text}</p>
          {cta && (
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">Request a quote <span aria-hidden="true">↗</span></Link>
              <Link to="/services" className="btn-outline">Explore services</Link>
            </div>
          )}
        </div>
        {isCarousel && (
          <div className="mt-12 flex items-center gap-3" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-current={active === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all ${active === index ? 'w-12 bg-gold' : 'w-6 bg-white/50 hover:bg-white'}`}
              />
            ))}
            <span className="ml-2 text-xs tracking-widest text-white/70">0{active + 1} / 0{slides.length}</span>
          </div>
        )}
      </div>
      <span className="absolute bottom-8 right-8 hidden text-xs uppercase tracking-[0.25em] text-white/60 sm:block">Made for the way India shops</span>
    </section>
  )
}
