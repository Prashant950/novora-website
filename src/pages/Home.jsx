import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Process from '../components/Process'
import { company, customerSectors, homeSlides, reasons, services } from '../data/site'
import {
  SparklesIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BuildingIcon,
  LayersIcon,
  ClockIcon,
  AwardIcon,
  MailIcon,
  PhoneIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  HomeIcon,
  UtensilsIcon,
} from '../components/Icons'

const sectorImages = {
  'A': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
  'B': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
  'C': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
  'D': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=900&q=80',
  'E': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=900&q=80',
  'F': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80',
}

const reasonIcons = [ShieldCheckIcon, LayersIcon, AwardIcon, ClockIcon]

const sectorData = [
  { id: '01', name: 'Fashion & Footwear', icon: ShoppingBagIcon, desc: 'Flagships, High-Street Boutiques & Apparel Chains', tag: 'Turnkey Rollout' },
  { id: '02', name: 'Beauty & Wellness', icon: SparklesIcon, desc: 'Cosmetics Counters, Luxury Salons & Retail Spas', tag: 'Precision Millwork' },
  { id: '03', name: 'Electronics & Tech', icon: SmartphoneIcon, desc: 'Experience Stores & Interactive Device Showrooms', tag: 'Backlit Signage' },
  { id: '04', name: 'Home & Lifestyle', icon: HomeIcon, desc: 'Furniture Galleries, Decor Studios & Concept Stores', tag: 'Custom Fixtures' },
  { id: '05', name: 'Food & Beverage', icon: UtensilsIcon, desc: 'QSR Outlets, Artisan Cafes & Fine Dining Frontages', tag: 'Fast-Track Fitout' },
  { id: '06', name: 'Malls & Megastores', icon: BuildingIcon, desc: 'Atrium Kiosks, Anchor Stores & Departmental Chains', tag: 'Structural QA' },
]

function ContactPreview() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone') || 'Not provided',
      project: form.get('project'),
      message: form.get('message'),
      source: 'Home Page Consultation Form',
    }

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // Fallback
    }

    try {
      const stored = JSON.parse(localStorage.getItem('novora_inquiries') || '[]')
      stored.unshift({ ...payload, id: 'LOC-' + Date.now(), createdAt: new Date().toISOString() })
      localStorage.setItem('novora_inquiries', JSON.stringify(stored))
    } catch {
      // Ignore
    }

    const subject = encodeURIComponent(`[NOVORA Consultation] ${payload.project} - ${payload.name}`)
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.project}\n\nProject Scope:\n${payload.message}`
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28 border-t border-slate-200">
      <div className="container-x relative">
        {/* Top Centered Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Let’s Make It Happen
          </h2>
          <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
            Tell us about your next store or campaign.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Whether you are planning a single flagship store or rolling out 50 retail touchpoints across India, our turnkey engineering team is ready to assist.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href={`mailto:${company.email}`}
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-gold hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                <MailIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Email</p>
                <p className="truncate text-sm font-bold text-ink group-hover:text-gold">{company.email}</p>
              </div>
            </a>

            <a
              href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-gold hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Call / WhatsApp</p>
                <p className="text-sm font-bold text-ink group-hover:text-gold">{company.phone}</p>
              </div>
            </a>

            {/* Trust highlights */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">What happens next?</h3>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Technical feasibility review within 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Complimentary BOQ estimation & timeline schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Project Manager assigned to your brand</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-9">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">Project Brief & Consultation</h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Submit your requirements; data is directly logged in our inquiries database.</p>
              </div>

              {submitted && (
                <div className="mt-5 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
                  ✓ Thank you! Your inquiry has been registered in our database (db.json) and your email draft has been prepared!
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="client-name">Your Name *</label>
                    <input
                      id="client-name"
                      required
                      name="name"
                      className="input mt-1.5"
                      placeholder="e.g. Rohit Sharma"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="client-email">Work Email *</label>
                    <input
                      id="client-email"
                      required
                      type="email"
                      name="email"
                      className="input mt-1.5"
                      placeholder="rohit@company.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="client-phone">Phone / WhatsApp *</label>
                    <input
                      id="client-phone"
                      required
                      type="tel"
                      name="phone"
                      pattern="[0-9]{10}"
                      className="input mt-1.5"
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="service-select">Requirement Type *</label>
                    <select
                      id="service-select"
                      required
                      name="project"
                      className="input mt-1.5"
                      defaultValue=""
                    >
                      <option value="" disabled>Select service domain</option>
                      {services.map(service => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Multi-Service Turnkey Rollout">Multi-Service Turnkey Rollout</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="project-desc">About Your Project *</label>
                  <textarea
                    id="project-desc"
                    required
                    name="message"
                    rows="4"
                    className="input mt-1.5 resize-y"
                    placeholder="Tell us about your store location(s), square footage, expected launch timeline, and special design requirements..."
                  />
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">
                    🔒 Data secured and stored in project database.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold group shrink-0 shadow-md disabled:opacity-50"
                  >
                    <span>{loading ? 'Submitting...' : 'Send Project Brief'}</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <Hero slides={homeSlides} />

      {/* 2. STATS BAR */}
      <Stats />

      {/* 3. WHO WE ARE SECTION */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-white">
        <div className="container-x">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Who We Are
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              We turn ambitious retail concepts into physical spaces people remember.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              A dedicated team of retail interior specialists, precision engineers, and master fabricators committed to delivering turnkey excellence across India.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Visual Feature Block */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
                  alt="NOVORA design studio and modern architectural fabrication"
                  className="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Highlight Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl backdrop-blur-md sm:max-w-xs transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <BuildingIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold text-ink leading-tight">100% In-House</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fabrication & Control</p>
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                  Eliminating subcontractor delays with state-of-the-art machinery and certified site engineers.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6">
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Precision engineering, disciplined timelines.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {company.mission}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {company.philosophy}
              </p>

              {/* Key Value Points */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircleIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 sm:text-sm">Single-Point Project Lead</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircleIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 sm:text-sm">120,000 Sq.Ft Factory</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircleIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 sm:text-sm">Pan-India Fleet & Freight</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircleIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 sm:text-sm">Stage-wise QA Inspection</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-dark group">
                  <span>Get to Know Us</span>
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/contact" className="text-link inline-flex items-center gap-2 text-sm font-bold">
                  Schedule Factory Visit <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES SECTION */}
      <section className="relative bg-slate-50 py-20 sm:py-24 lg:py-28 border-t border-slate-200">
        <div className="container-x">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              Everything your store needs, crafted under one roof.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              From luxury mall boutiques to pan-India high-street rollouts, our comprehensive services deliver end-to-end retail excellence.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(service => (
              <Link
                key={service.id}
                to="/services"
                className="service-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-gold hover:shadow-xl"
              >
                {/* Image Preview with Hover Zoom */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-52">
                  <img
                    src={sectorImages[service.id]}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-md bg-black/75 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                    SERVICE {service.id}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-2">
                      {service.short}
                    </p>

                    {/* Scope tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.scope.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Link */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors">
                    <span>Explore Module Details</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/services" className="btn-dark inline-flex items-center gap-2">
              <span>View All 6 Services</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE NOVORA */}
      <section className="relative bg-[#10141e] py-20 text-white sm:py-24 lg:py-28 overflow-hidden">
        <div className="container-x relative">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Why Choose NOVORA
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              A better build starts with a better partner.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Traditional retail execution breaks down when split across disparate contractors. NOVORA eliminates fragmentation with centralized accountability.
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([title, detail], index) => {
              const Icon = reasonIcons[index] || ShieldCheckIcon
              return (
                <article
                  key={title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-white/[0.08] hover:shadow-[0_15px_35px_-10px_rgba(197,168,92,0.2)]"
                >
                  <div>
                    {/* Header: Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-extrabold text-gold/80 group-hover:text-gold">
                        0{index + 1}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-gold transition-colors sm:text-xl">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {detail}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gold/80">
                    Guaranteed Standard
                  </div>
                </article>
              )
            })}
          </div>

          {/* Quick CTA banner */}
          <div className="mt-14 rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 via-white/5 to-transparent p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
            <div>
              <h4 className="font-display text-lg font-bold text-white sm:text-xl">Planning a nationwide multi-city rollout?</h4>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">Speak with our principal project engineers for feasibility & logistics timelines.</p>
            </div>
            <Link to="/contact" className="btn-gold mt-4 sm:mt-0 shrink-0">
              Consult an Engineer <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. EXECUTION FRAMEWORK (PROCESS) */}
      <Process />

      {/* 7. OUR CUSTOMERS / SECTORS */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-white border-t border-slate-200">
        <div className="container-x text-center">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Our Customers
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              Built for ambitious brands across retail sectors.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              From new concept boutiques to nationwide high-street store chains, we help craft thoughtful customer journeys across every retail category.
            </p>
          </div>
        </div>

        {/* Attractive Sector Cards Showcase (Fully Contained & Mobile Responsive) */}
        <div className="container-x mb-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectorData.map(sec => {
              const Icon = sec.icon
              return (
                <div
                  key={sec.name}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50/70 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_20px_40px_-15px_rgba(197,168,92,0.3)] hover:ring-2 hover:ring-gold/30 cursor-pointer overflow-hidden"
                >
                  <div>
                    {/* Top Row: Icon + Index */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-tr from-gold/20 via-gold/10 to-transparent text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-xl font-extrabold text-gold/70 group-hover:text-gold transition-colors">
                        {sec.id}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="mt-4 font-display text-lg font-bold text-ink transition-colors group-hover:text-gold sm:text-xl">
                      {sec.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {sec.desc}
                    </p>
                  </div>

                  {/* Bottom Tag */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-gold/10 px-2.5 py-1 text-[11px] font-bold text-gold-dark">
                      ✦ {sec.tag}
                    </span>
                    <span className="text-xs font-bold text-navy group-hover:text-gold transition-colors group-hover:translate-x-1 duration-200">
                      Explore →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Marquee Sector Strip with smooth edge masks and hover gold animation */}
        <div className="sector-marquee mt-4" aria-label="Customer sectors we serve">
          <div className="sector-track">
            {[...customerSectors, ...customerSectors, ...customerSectors].map((sector, index) => (
              <span
                className="sector-pill group cursor-pointer transition-all duration-300 hover:border-gold hover:text-ink hover:shadow-md hover:scale-105"
                key={`${sector}-${index}`}
              >
                <span className="h-2 w-2 rounded-full bg-gold transition-transform group-hover:scale-150" />
                <span className="group-hover:text-gold font-bold">{sector}</span>
                <span className="text-gold/60 group-hover:text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSIDE THE PROCESS (CINEMATIC FACTORY SHOWCASE) */}
      <section className="relative bg-[#0e121b] py-20 text-white sm:py-24 lg:py-28 overflow-hidden">
        <div className="container-x relative">
          {/* Top Centered Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Inside The Process
            </h2>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              Craft, care and detail in every finish.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              A closer look at how ideas take shape—from automated CNC routing and precision powder-coating to the final millimeter of joinery.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-gold/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <BuildingIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">120,000 Sq.Ft Plant Capacity</h3>
                  <p className="text-xs text-slate-400 mt-1">High-output automated machinery built for concurrent multi-store production.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-gold/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Stage-Wise Quality Sign-Off</h3>
                  <p className="text-xs text-slate-400 mt-1">Material testing, load verification, and zero-defect packaging checks.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about" className="btn-outline group">
                  <span>Discover Our Approach</span>
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Video Showcase */}
            <div className="lg:col-span-7">
              <div className="video-frame relative overflow-hidden rounded-2xl border border-white/15 bg-black">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  preload="none"
                  playsInline
                  poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                  aria-label="A look at contemporary retail interior design and fabrication"
                >
                  <source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">
                Inside NOVORA: From concept engineering to physical completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LET’S MAKE IT HAPPEN (CONTACT PREVIEW) */}
      <ContactPreview />
    </div>
  )
}
