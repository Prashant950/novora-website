import { useState } from 'react'
import Hero from '../components/Hero'
import { company } from '../data/site'

const steps = ['Project', 'Scope', 'Contact']
const init = { projectType: '', carpetArea: '', launchDate: '', cad: null, multiCity: false, cities: '', name: '', company: '', email: '', phone: '' }

export default function Contact() {
  const [step, setStep] = useState(0)
  const [f, setF] = useState(init)
  const [done, setDone] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'file' ? e.target.files[0] : e.target.value })
  const next = () => {
    const fields = [...document.querySelectorAll('#rfq-form [required]')].filter(field => field.offsetParent !== null)
    const invalid = fields.find(field => !field.checkValidity())
    if (invalid) {
      invalid.reportValidity()
      return
    }
    setStep(step + 1)
  }
  const submit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${f.name}`)
    const body = encodeURIComponent([
      `Name: ${f.name}`,
      `Company: ${f.company}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
      `Project: ${f.projectType}`,
      `Carpet area: ${f.carpetArea} sq. ft.`,
      `Launch date: ${f.launchDate}`,
      `Multi-city rollout: ${f.multiCity ? f.cities || 'Yes' : 'No'}`,
      `Selected file: ${f.cad?.name || 'None'}`,
      '',
      'Please attach the selected file to this email if required.',
    ].join('\n'))
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
    setDone(true)
  }

  return (
    <>
      <Hero cta={false} eyebrow="Let’s talk" title="Good spaces start with a conversation." text="Tell us what you’re planning. Share the brief, the timeline and the details that matter—we’ll take it from there."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85" />
      <section className="bg-mist py-16 sm:py-20"><div className="container-x grid gap-9 lg:grid-cols-[1.4fr_.7fr] lg:gap-12">
        <div>
          {done ? <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12"><span className="font-display text-5xl text-gold">Thank you</span><p className="mx-auto mt-3 max-w-md text-slate-600">Your email app should open with your project details ready. Review the message and send it to complete your enquiry.</p><a href={`mailto:${company.email}`} className="text-link mt-5 inline-block font-bold">Email us directly</a></div> : (
            <form id="rfq-form" onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-[0_20px_70px_-35px_rgba(21,33,59,.3)] sm:p-9">
              <div className="mb-9 flex gap-3 sm:gap-5">{steps.map((s, i) => <div key={s} className="flex-1"><div className={`h-1.5 rounded-full ${i <= step ? 'bg-gold' : 'bg-slate-200'}`} /><p className={`mt-2 text-[11px] font-semibold sm:text-xs ${i <= step ? 'text-ink' : 'text-slate-400'}`}>{i + 1}. {s}</p></div>)}</div>
              <div className="grid gap-4 sm:grid-cols-2">
                {step === 0 && <>
                  <select required className="input sm:col-span-2" value={f.projectType} onChange={set('projectType')}>
                    <option value="">Project type</option>{['Turnkey Fit-Out', 'Fixtures & Furniture', 'Signage & Facade', 'Visual Merchandising', 'Graphics & Digital', 'Packaging'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <input required type="number" placeholder="Store carpet area (sq. ft.)" className="input" value={f.carpetArea} onChange={set('carpetArea')} />
                  <input required type="date" className="input" value={f.launchDate} onChange={set('launchDate')} />
                </>}
                {step === 1 && <>
                  <label className="form-label rounded-lg border border-slate-300 p-4 sm:col-span-2">Upload architectural CAD / PDF <input type="file" accept=".dwg,.dxf,.pdf" className="mt-2 block w-full text-sm" onChange={set('cad')} /><span className="mt-2 block text-xs text-slate-500">Your email app cannot attach this automatically. You’ll be reminded to add it before sending.</span></label>
                  <label className="flex items-center gap-3 text-sm sm:col-span-2"><input type="checkbox" checked={f.multiCity} onChange={set('multiCity')} /> Multi-city rollout</label>
                  {f.multiCity && <input placeholder="Cities / number of stores" className="input sm:col-span-2" value={f.cities} onChange={set('cities')} />}
                </>}
                {step === 2 && <>
                  <input required placeholder="Full name" className="input" value={f.name} onChange={set('name')} />
                  <input required placeholder="Company" className="input" value={f.company} onChange={set('company')} />
                  <input required type="email" placeholder="Work email" className="input" value={f.email} onChange={set('email')} />
                  <input required placeholder="Phone" className="input" value={f.phone} onChange={set('phone')} />
                </>}
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" disabled={!step} onClick={() => setStep(step - 1)} className="btn border border-slate-300 disabled:opacity-30">Back</button>
                {step < 2 ? <button type="button" onClick={next} className="btn bg-ink text-white hover:bg-gold hover:text-ink">Next <span aria-hidden="true">→</span></button> : <button className="btn-gold">Prepare your enquiry <span aria-hidden="true">↗</span></button>}
              </div>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl bg-navy p-6 text-white sm:p-7"><p className="eyebrow">Email</p><a className="mt-3 block break-all text-lg font-semibold hover:text-gold" href={`mailto:${company.email}`}>{company.email}</a><p className="mt-2 text-sm leading-6 text-white/60">Send your project brief or ask us a question.</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-7"><p className="eyebrow">Call</p><a className="mt-3 block text-lg font-semibold text-ink hover:text-gold" href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a><p className="mt-2 text-sm leading-6 text-slate-600">We’re happy to talk through your requirements.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-7"><p className="font-bold text-ink">A few helpful details</p><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>• Project type and store format</li><li>• Target opening or launch date</li><li>• Locations and approximate area</li></ul></div>
        </aside>
      </div></section>
    </>
  )
}
