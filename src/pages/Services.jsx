import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Process from '../components/Process'
import { services } from '../data/site'

export default function Services() {
  return (
    <>
      <Hero cta={false} eyebrow="Services & Solutions" title="Six modules. One seamless delivery." text="From structural fit-out to the last signage letter, every module is engineered and produced in-house."
        image="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=2200&q=85" />
      <section className="py-16 sm:py-20"><div className="container-x">
        <div className="mb-10 max-w-2xl"><p className="eyebrow">From shop window to shop floor</p><h2 className="h2">The details that bring your brand to life.</h2><p className="mt-4 leading-7 text-slate-600">One connected team for the pieces that make your customer experience feel unmistakably yours.</p></div>
        <div className="space-y-5">
        {services.map(s => (
          <article key={s.id} className="grid gap-7 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-gold/60 hover:shadow-lg sm:p-8 lg:grid-cols-[1.05fr_1fr_1fr] lg:gap-9">
            <div><span className="font-display text-5xl text-gold">{s.id}</span><h2 className="mt-2 text-xl font-bold leading-snug">{s.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{s.short}</p></div>
            <div><h3 className="eyebrow">Scope of work</h3><ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-1">{s.scope.map(x => <li key={x} className="flex gap-2"><span className="text-gold">✦</span>{x}</li>)}</ul></div>
            <div className="space-y-5 border-t border-slate-100 pt-5 text-sm sm:border-0 sm:pt-0"><div><h3 className="eyebrow">Materials & machinery</h3><p className="mt-2 leading-6 text-slate-600">{s.tech}</p></div><div><h3 className="eyebrow">Applications</h3><p className="mt-2 leading-6 text-slate-600">{s.apps}</p></div></div>
          </article>
        ))}
        </div>
      </div></section>
      <Process />
      <section className="bg-navy py-16 text-center text-white sm:py-20"><div className="container-x">
        <p className="eyebrow">Have a project in mind?</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Let’s make your next space count.</h2>
        <Link to="/contact" className="btn-gold mt-7">Talk to our team <span aria-hidden="true">↗</span></Link>
      </div></section>
    </>
  )
}
