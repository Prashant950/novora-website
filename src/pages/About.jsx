import Hero from '../components/Hero'
import Stats from '../components/Stats'
import { company, infra } from '../data/site'

export default function About() {
  return (
    <>
      <Hero cta={false} eyebrow="About NOVORA" title="Built on precision. Delivered with accountability." text={company.mission}
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85" />
      <Stats />
      <section className="py-20 sm:py-24"><div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85" alt="Carefully finished contemporary interior" className="h-[320px] w-full rounded-2xl object-cover sm:h-[440px]" />
          <span className="absolute bottom-5 left-5 rounded-lg bg-white/95 px-4 py-3 text-sm font-bold text-ink shadow-lg">Designed for the details</span>
        </div>
        <div>
          <p className="eyebrow">A little about us</p><h2 className="h2">Thoughtful design. Disciplined delivery.</h2>
          <p className="mt-5 leading-7 text-slate-600">{company.philosophy}</p>
          <div className="mt-8 border-l-2 border-gold pl-5"><p className="text-sm font-bold uppercase tracking-wider text-navy">Our promise</p><p className="mt-2 leading-7 text-slate-600">{company.uvp}</p></div>
        </div>
      </div></section>
      <section className="bg-navy py-16 text-white sm:py-20"><div className="container-x grid gap-8 md:grid-cols-3">
        {[
          ['01', 'Listen first', 'We begin with your brand, brief, audience and the realities of your site.'],
          ['02', 'Make with care', 'Every material, finish and fixture is considered against the experience you want to create.'],
          ['03', 'Deliver together', 'A coordinated team keeps your design, production and on-site execution moving forward.'],
        ].map(([n, title, text]) => <article key={n} className="border-t border-white/20 pt-5"><span className="font-display text-4xl text-gold">{n}</span><h3 className="mt-3 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></article>)}
      </div></section>
      <section className="bg-mist py-20 sm:py-24"><div className="container-x">
        <p className="eyebrow">Manufacturing & Infrastructure</p><h2 className="h2">In-house capability at scale</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {infra.map(([t, d], index) => <div key={t} className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="font-display text-3xl text-gold">0{index + 1}</span><h3 className="mt-3 font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></div>)}
        </div>
        <p className="mt-8 text-sm text-slate-500">Quality benchmarks, ISO and safety certifications: add verified details here.</p>
      </div></section>
    </>
  )
}
