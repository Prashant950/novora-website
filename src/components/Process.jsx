import { phases } from '../data/site'
import {
  UsersIcon,
  RulerIcon,
  LayersIcon,
  ClockIcon,
  CpuIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  SparklesIcon,
} from './Icons'

const phaseIcons = [
  UsersIcon,
  RulerIcon,
  LayersIcon,
  ClockIcon,
  CpuIcon,
  TruckIcon,
  ShieldCheckIcon,
]

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-20 sm:py-24 lg:py-28 border-y border-slate-200/70">
      <div className="container-x relative">
        {/* Top Centered Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Execution Framework
          </h2>
          <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
            Seven disciplined phases. One accountable partner.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            From initial site audit to final handover sign-off, every stage is executed by our in-house team to guarantee zero miscommunication and zero timeline drift.
          </p>
        </div>

        {/* Phase Pipeline Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {phases.map(([title, desc, deliverable], index) => {
            const Icon = phaseIcons[index] || SparklesIcon
            const isLast = index === phases.length - 1

            return (
              <div
                key={title}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_20px_45px_-15px_rgba(197,168,92,0.25)] ${
                  isLast
                    ? 'border-gold/60 bg-gradient-to-br from-white via-white to-gold/10 sm:col-span-2 lg:col-span-1 xl:col-span-2'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Bar: Phase number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-navy/5 px-2.5 py-1 text-xs font-bold tracking-wider text-navy">
                      PHASE 0{index + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-200 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="mt-5 font-display text-lg font-bold text-ink transition-colors group-hover:text-gold sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>

                {/* Deliverable Box */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deliverable</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-navy">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{deliverable}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gold sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-ink sm:text-lg">Zero Subcontracting Friction</h4>
              <p className="text-xs text-slate-600 sm:text-sm">
                Designers, CNC operators, logistics coordinators, and site supervisors all work for NOVORA.
              </p>
            </div>
          </div>
          <a
            href="/services"
            className="btn-outline-dark shrink-0 text-xs sm:text-sm font-semibold transition hover:border-gold hover:text-gold"
          >
            Review Scope & Tech Details →
          </a>
        </div>
      </div>
    </section>
  )
}
