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
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.35 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{new Intl.NumberFormat('en-IN').format(count)}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="bg-ink text-white">
      <div className="container-x grid grid-cols-2 gap-y-8 py-9 sm:grid-cols-3 lg:grid-cols-5 lg:py-11">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`px-3 ${index > 0 ? 'lg:border-l lg:border-white/15 lg:pl-7' : ''}`}>
            <p className="font-display text-4xl text-gold sm:text-5xl"><Counter value={stat.value} suffix={stat.suffix} /></p>
            <p className="mt-1 max-w-[170px] text-xs leading-5 text-white/65 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
