import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Hero from '../components/Hero'
import { company, services } from '../data/site'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowUpRightIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '../components/Icons'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service') || ''

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: preselectedService || '',
    carpetArea: '',
    launchDate: '',
    multiCity: false,
    cities: '',
    message: '',
  })

  useEffect(() => {
    if (preselectedService) {
      setForm(prev => ({ ...prev, projectType: preselectedService }))
    }
  }, [preselectedService])

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [submittedInquiry, setSubmittedInquiry] = useState(null)

  const validate = current => {
    const errs = {}

    if (!current.name.trim()) {
      errs.name = 'Full name is required.'
    } else if (current.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    if (!current.company.trim()) {
      errs.company = 'Company / Brand name is required.'
    }

    if (!current.email.trim()) {
      errs.email = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.email.trim())) {
      errs.email = 'Please provide a valid corporate email.'
    }

    const cleanPhone = current.phone.replace(/[\s-+()]/g, '')
    if (!cleanPhone) {
      errs.phone = 'Mobile or WhatsApp number is required.'
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Phone number must be at least 10 digits.'
    }

    if (!current.projectType) {
      errs.projectType = 'Please select a project service domain.'
    }

    if (!current.carpetArea || Number(current.carpetArea) <= 0) {
      errs.carpetArea = 'Please enter approximate carpet area in sq. ft.'
    }

    if (!current.launchDate) {
      errs.launchDate = 'Please specify target launch date.'
    }

    if (!current.message.trim() || current.message.trim().length < 10) {
      errs.message = 'Please provide a brief scope description (min 10 characters).'
    }

    return errs
  }

  const handleChange = field => e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const updated = { ...form, [field]: value }
    setForm(updated)

    if (touched[field]) {
      setErrors(validate(updated))
    }
  }

  const handleBlur = field => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0]
      const el = document.getElementById(`field-${firstKey}`)
      if (el) el.focus()
      return
    }

    setLoading(true)

    const payload = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      projectType: form.projectType,
      carpetArea: `${form.carpetArea} sq.ft`,
      launchDate: form.launchDate,
      multiCityRollout: form.multiCity ? form.cities || 'Yes' : 'No',
      message: form.message.trim(),
      source: 'Contact Page RFQ Form',
    }

    let savedEntry = {
      id: 'NOV-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      ...payload,
    }

    try {
      // POST to backend API to write to db.json
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const json = await res.json()
        if (json.inquiry) savedEntry = json.inquiry
      }
    } catch (err) {
      console.warn('API sync warning, falling back to local store', err)
    }

    // Also persist in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('novora_inquiries') || '[]')
      stored.unshift(savedEntry)
      localStorage.setItem('novora_inquiries', JSON.stringify(stored))
    } catch {
      // Ignore
    }

    // Launch mailto for direct client email dispatch
    const subject = encodeURIComponent(`[NOVORA RFQ] ${payload.projectType} - ${payload.company}`)
    const body = encodeURIComponent(
      `Inquiry Reference: ${savedEntry.id}\n\nClient Name: ${payload.name}\nCompany: ${payload.company}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.projectType}\nCarpet Area: ${payload.carpetArea}\nTarget Launch Date: ${payload.launchDate}\nMulti-City: ${payload.multiCityRollout}\n\nProject Scope:\n${payload.message}`
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`

    setLoading(false)
    setSubmittedInquiry(savedEntry)
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <Hero
        cta={false}
        eyebrow="Direct RFQ & Consultation"
        title="Good spaces start with an honest conversation."
        text="Share your store footprint, timelines, and design vision. Our turnkey engineering and estimating team will provide technical feasibility and preliminary BOQ."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="relative bg-slate-50 py-16 sm:py-20 lg:py-24 border-t border-slate-200">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-10">
                {submittedInquiry ? (
                  <div className="py-8 text-center sm:py-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                      <CheckCircleIcon className="h-9 w-9" />
                    </div>
                    <span className="mt-5 block font-display text-3xl font-extrabold text-ink sm:text-4xl">
                      Inquiry Registered!
                    </span>
                    <div className="mt-4 inline-block rounded-lg border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold text-ink">
                      Reference ID: <span className="font-mono text-gold-dark">{submittedInquiry.id}</span>
                    </div>
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
                      Your details have been saved to our inquiries database (<code>db.json</code>) and your email app has been opened with the brief ready to send.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => {
                          setSubmittedInquiry(null)
                          setForm({
                            name: '',
                            company: '',
                            email: '',
                            phone: '',
                            projectType: '',
                            carpetArea: '',
                            launchDate: '',
                            multiCity: false,
                            cities: '',
                            message: '',
                          })
                        }}
                        className="btn-outline-dark text-xs sm:text-sm font-semibold"
                      >
                        Submit Another Inquiry
                      </button>
                      <a href={`mailto:${company.email}`} className="btn-gold text-xs sm:text-sm">
                        Direct Email Follow-up →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="border-b border-slate-100 pb-6">
                      <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                        Request for Proposal
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                      {/* Section 1: Contact Info */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gold">
                          01. Primary Contact Information
                        </h3>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="form-label" htmlFor="field-name">Your Full Name *</label>
                            <input
                              id="field-name"
                              value={form.name}
                              onChange={handleChange('name')}
                              onBlur={handleBlur('name')}
                              placeholder="e.g. Vikram Malhotra"
                              className={`input mt-1.5 ${touched.name && errors.name ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.name && errors.name && (
                              <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label" htmlFor="field-company">Company / Brand Name *</label>
                            <input
                              id="field-company"
                              value={form.company}
                              onChange={handleChange('company')}
                              onBlur={handleBlur('company')}
                              placeholder="e.g. Zara Retail India"
                              className={`input mt-1.5 ${touched.company && errors.company ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.company && errors.company && (
                              <p className="mt-1 text-xs text-rose-500">{errors.company}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label" htmlFor="field-email">Corporate Work Email *</label>
                            <input
                              id="field-email"
                              type="email"
                              value={form.email}
                              onChange={handleChange('email')}
                              onBlur={handleBlur('email')}
                              placeholder="vikram@brand.com"
                              className={`input mt-1.5 ${touched.email && errors.email ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.email && errors.email && (
                              <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label" htmlFor="field-phone">Mobile / WhatsApp *</label>
                            <input
                              id="field-phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange('phone')}
                              onBlur={handleBlur('phone')}
                              placeholder="10-digit mobile number"
                              className={`input mt-1.5 ${touched.phone && errors.phone ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.phone && errors.phone && (
                              <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Store / Project Scope */}
                      <div className="border-t border-slate-100 pt-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gold">
                          02. Store Requirements & Scope
                        </h3>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label className="form-label" htmlFor="field-projectType">Service Requirement *</label>
                            <select
                              id="field-projectType"
                              value={form.projectType}
                              onChange={handleChange('projectType')}
                              onBlur={handleBlur('projectType')}
                              className={`input mt-1.5 ${touched.projectType && errors.projectType ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            >
                              <option value="">Select service discipline</option>
                              {services.map(s => (
                                <option key={s.id} value={s.title}>
                                 {s.title}
                                </option>
                              ))}
                              <option value="Complete Turnkey Nationwide Rollout">
                                Complete Turnkey Nationwide Rollout
                              </option>
                            </select>
                            {touched.projectType && errors.projectType && (
                              <p className="mt-1 text-xs text-rose-500">{errors.projectType}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label" htmlFor="field-carpetArea">Approx. Carpet Area (Sq.Ft) *</label>
                            <input
                              id="field-carpetArea"
                              type="number"
                              min="50"
                              value={form.carpetArea}
                              onChange={handleChange('carpetArea')}
                              onBlur={handleBlur('carpetArea')}
                              placeholder="e.g. 1850"
                              className={`input mt-1.5 ${touched.carpetArea && errors.carpetArea ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.carpetArea && errors.carpetArea && (
                              <p className="mt-1 text-xs text-rose-500">{errors.carpetArea}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label" htmlFor="field-launchDate">Target Handover / Launch Date *</label>
                            <input
                              id="field-launchDate"
                              type="date"
                              value={form.launchDate}
                              onChange={handleChange('launchDate')}
                              onBlur={handleBlur('launchDate')}
                              className={`input mt-1.5 ${touched.launchDate && errors.launchDate ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.launchDate && errors.launchDate && (
                              <p className="mt-1 text-xs text-rose-500">{errors.launchDate}</p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={form.multiCity}
                                onChange={handleChange('multiCity')}
                                className="h-4 w-4 rounded text-gold focus:ring-gold"
                              />
                              <span>This is a multi-city rollout across multiple locations</span>
                            </label>

                            {form.multiCity && (
                              <input
                                placeholder="Specify target cities & number of stores (e.g. Delhi NCR, Mumbai, Bengaluru - 12 stores)"
                                value={form.cities}
                                onChange={handleChange('cities')}
                                className="input mt-3"
                              />
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label className="form-label" htmlFor="field-message">Project Scope & Design Notes *</label>
                            <textarea
                              id="field-message"
                              rows="4"
                              value={form.message}
                              onChange={handleChange('message')}
                              onBlur={handleBlur('message')}
                              placeholder="Describe your site status (bare shell / mall warm shell), layout needs, ceiling heights, electrical/HVAC requirements, and special millwork finishes..."
                              className={`input mt-1.5 resize-y ${touched.message && errors.message ? '!border-rose-500 ring-1 ring-rose-500' : ''}`}
                            />
                            {touched.message && errors.message && (
                              <p className="mt-1 text-xs text-rose-500">{errors.message}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <ShieldCheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>Direct technical review by senior project engineers.</span>
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-gold group shrink-0 shadow-lg disabled:opacity-50"
                        >
                          <span>{loading ? 'Processing...' : 'Submit Inquiry'}</span>
                          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct email card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-gold">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <MailIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">Direct Project Desk</h3>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block text-sm font-semibold text-gold hover:underline break-all"
                >
                  {company.email}
                </a>
                <p className="mt-2 text-xs text-slate-500">
                  Send architectural drawings, CAD files, or BOQ sheets directly to our estimators.
                </p>
              </div>

              {/* Direct call card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-gold">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">Helpline & WhatsApp</h3>
                <a
                  href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                  className="mt-1 block text-sm font-semibold text-gold hover:underline"
                >
                  {company.phone}
                </a>
                <p className="mt-2 text-xs text-slate-500">
                  Monday to Saturday: 9:00 AM – 7:30 PM IST. Direct consultation available.
                </p>
              </div>

              {/* Locations */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <MapPinIcon className="h-4 w-4 text-gold" />
                  <span>Physical Facilities</span>
                </div>
                <div className="mt-4 space-y-4 text-xs text-slate-600">
                  <div>
                    <p className="font-bold text-ink">Headquarters & Design Studio</p>
                    <p className="mt-0.5 text-slate-500">Commercial Business Park, Central Hub</p>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="font-bold text-ink">120,000 Sq.Ft Manufacturing Plant</p>
                    <p className="mt-0.5 text-slate-500">Industrial Area, CNC & Fabrication Zone</p>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <ClockIcon className="h-4 w-4" />
                  <span>SLA Guarantee</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  Initial feasibility review & preliminary timeline breakdown delivered within <strong>24 business hours</strong> of drawing receipt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
