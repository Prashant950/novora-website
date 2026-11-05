import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Process from '../components/Process'
import { services } from '../data/site'
import {
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ShieldCheckIcon,
  CpuIcon,
  BuildingIcon,
} from '../components/Icons'

const serviceImages = {
  'A': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  'B': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  'C': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
  'D': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
  'E': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
  'F': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
}

export default function Services() {
  const [selectedId, setSelectedId] = useState('ALL')
  const [activeModalService, setActiveModalService] = useState(null)

  // Bulletproof background scroll lock when modal is open
  useEffect(() => {
    if (activeModalService) {
      document.documentElement.classList.add('modal-open')
      document.body.classList.add('modal-open')
    } else {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }
  }, [activeModalService])

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setActiveModalService(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredServices = selectedId === 'ALL'
    ? services
    : services.filter(s => s.id === selectedId)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <Hero
        cta={false}
        eyebrow="Capabilities & Solutions"
        title="Specialized modules. One seamless turnkey delivery."
        text="From structural store fit-outs and precision millwork to bespoke illuminated facades, every module is engineered, manufactured, and installed in-house."
        image="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=2200&q=85"
      />

      {/* Services Grid Section */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200">
        <div className="container-x">
          {/* Top Centered Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Comprehensive Retail Modules
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              The craft and precision that makes your store unmistakable.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Click <strong>"View Details"</strong> on any module below to inspect full technical scope, machinery, and applications.
            </p>

            {/* Quick Filter Tabs */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedId('ALL')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  selectedId === 'ALL'
                    ? 'bg-ink text-gold shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All 6 Modules
              </button>
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                    selectedId === s.id
                      ? 'bg-gold text-ink shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Mod {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* Compact, Sleek, Responsive Cards Grid (Small Cards as requested) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
              >
                <div>
                  {/* Compact Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-52">
                    <img
                      src={serviceImages[service.id]}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-3.5 rounded-md bg-black/75 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                      MODULE {service.id}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-gold sm:text-xl line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2 sm:text-sm">
                      {service.short}
                    </p>

                    {/* Scope Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.scope.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: "View Details" Button */}
                <div className="border-t border-slate-100 p-5 pt-4">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="btn-outline-dark group/btn w-full !min-h-10 justify-between text-xs font-bold transition hover:border-gold hover:text-gold active:scale-95"
                  >
                    <span>View Full Details & Specs</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL MODAL (Popup Window) */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModalService(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
                  MODULE {activeModalService.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Technical Specification
                </span>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-600 transition hover:bg-slate-100 hover:text-ink"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900 sm:h-64">
              <img
                src={serviceImages[activeModalService.id]}
                alt={activeModalService.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                  Overview
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {activeModalService.short}
                </p>
              </div>

              {/* Scope of Work */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
                  Scope of Work & Deliverables
                </h4>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {activeModalService.scope.map(item => (
                    <div key={item} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-2.5 text-xs font-medium text-slate-800">
                      <CheckCircleIcon className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machinery & Technology */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Materials & In-House Machinery
                </h4>
                <p className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  {activeModalService.tech}
                </p>
              </div>

              {/* Key Applications */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Best Suited For
                </h4>
                <p className="mt-1.5 text-xs text-slate-700 sm:text-sm">
                  {activeModalService.apps}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="sticky bottom-0 z-20 flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setActiveModalService(null)}
                className="btn-outline-dark text-xs sm:text-sm"
              >
                Close Window
              </button>
              <Link
                to={`/contact?service=${encodeURIComponent(activeModalService.title)}`}
                className="btn-gold text-xs sm:text-sm shadow-md"
                onClick={() => setActiveModalService(null)}
              >
                <span>Request Proposal for This Service</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Execution Process */}
      <Process />

      {/* Bottom CTA Banner */}
      <section className="relative bg-[#10141e] py-20 text-center text-white sm:py-24">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have a store, rollout or campaign in mind?
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Talk to our engineering and design team. We provide rapid BOQ estimation and structural audit assistance.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <span>Start Project Consultation</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
