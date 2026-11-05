import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/site'

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let frame
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCount(value)
          observer.disconnect()
          return
        }
        const start = performance.now()
        const duration = 1400
        const animate = now => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 4
          setCount(Math.round(value * eased))
          if (progress < 1) frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{new Intl.NumberFormat('en-IN').format(count)}{suffix}</span>
}

export default function Stats() {
  // Take exactly 4 stats for 4 symmetrical boxes (4 khaane)
  const displayStats = stats.slice(0, 4)

  return (
    <section className="relative border-y border-white/10 bg-[#12141a] text-white">
      <div className="container-x">
        {/* Exactly 4 boxes: 2x2 on mobile, 4 columns on tablet & desktop */}
        <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 sm:border-b-0 sm:grid-cols-4">
          {displayStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center text-center py-6 px-3 sm:py-8 sm:px-4 ${
                index >= 2 ? 'border-t border-white/10 sm:border-t-0' : ''
              }`}
            >
              <div className="font-display text-3xl font-extrabold tracking-tight text-gold sm:text-4xl lg:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-slate-300 sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
