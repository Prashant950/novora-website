import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import { company, infra } from '../data/site'
import {
  SparklesIcon,
  ShieldCheckIcon,
  BuildingIcon,
  LayersIcon,
  CheckCircleIcon,
  AwardIcon,
  ClockIcon,
  ArrowUpRightIcon,
  TruckIcon,
  CpuIcon,
} from '../components/Icons'

const pillars = [
  {
    icon: ShieldCheckIcon,
    title: 'Single-Point Accountability',
    desc: 'From initial civil work to final illuminated signage, you work with one dedicated project leadership team.',
  },
  {
    icon: CpuIcon,
    title: 'In-House Precision',
    desc: '120,000 sq.ft of advanced CNC routing, laser cutting and automated edge-banding ensures millimeter-level accuracy.',
  },
  {
    icon: ClockIcon,
    title: 'Zero Timeline Drift',
    desc: 'Controlled factory production schedules eliminate unpredictable on-site delays and contractor bottlenecks.',
  },
  {
    icon: TruckIcon,
    title: 'Pan-India Delivery',
    desc: 'Shock-proof crated logistics and trained installation crews operating seamlessly across 40+ Indian cities.',
  },
]

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <Hero
        cta={false}
        eyebrow="About NOVORA"
        title="Built on precision. Delivered with accountability."
        text={company.mission}
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
      />

      {/* Stats */}
      <Stats />

      {/* Narrative & Story Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-white">
        <div className="container-x">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Thoughtful Design. Disciplined Delivery.
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              Reinventing the Indian retail fit-out experience.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              A dedicated team of retail interior specialists, precision engineers, and master fabricators committed to delivering turnkey excellence across India.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                  alt="NOVORA bespoke interior craftsmanship"
                  className="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl backdrop-blur-md sm:max-w-xs transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <AwardIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-ink leading-tight">15+ Years</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Retail Excellence</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600 border-t border-slate-100 pt-2">
                  Building retail environments that perform for decades, not just seasons.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Built to deliver world-class retail environments.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {company.philosophy}
              </p>

              <div className="mt-7 rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold">Our Core Promise</p>
                <p className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
                  "{company.uvp}"
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-gold group">
                  <span>Start A Conversation</span>
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/services" className="btn-outline-dark">
                  <span>Explore Capabilities →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative bg-[#10141e] py-20 text-white sm:py-24 lg:py-28 border-t border-white/10">
        <div className="container-x">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our Core Pillars
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              How we protect your budget, brand identity, and delivery timeline.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(pillar => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-white/[0.08] hover:shadow-[0_15px_35px_-10px_rgba(197,168,92,0.2)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing & Infrastructure */}
      <section className="relative bg-slate-50 py-20 sm:py-24 lg:py-28 border-y border-slate-200">
        <div className="container-x">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Manufacturing & Infrastructure
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              120,000 Sq.Ft in-house plant engineered for concurrent rollouts.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Equipped with imported European and Japanese machinery, our manufacturing plant delivers turnkey modular components, laser-cut fixtures, and architectural finishes at scale.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {infra.map(([title, desc], index) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-gold">0{index + 1}</span>
                  <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-ink transition-colors">
                    <CpuIcon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-ink sm:text-lg">Certified Quality & Safety Protocols</h4>
                <p className="text-xs text-slate-600 sm:text-sm">
                  Fire retardant coatings, ISO compliant manufacturing, and stage-wise load test reports provided with every handover.
                </p>
              </div>
            </div>
            <Link to="/contact" className="btn-gold mt-4 sm:mt-0 shrink-0 text-xs sm:text-sm">
              Schedule Plant Audit <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
