import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Process from '../components/Process'
import { company, customerSectors, homeSlides, reasons, services } from '../data/site'

const sectorImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85'

function ContactPreview() {
  const submit = event => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Project enquiry from ${form.get('name')}`)
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nProject: ${form.get('project')}\n\n${form.get('message')}`,
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="self-center">
          <p className="eyebrow">Let’s make it happen</p>
          <h2 className="h2">Tell us about your next store or campaign.</h2>
          <p className="mt-5 max-w-lg leading-7 text-slate-600">Share a few details about your project. Our team will get back to you with the next steps.</p>
          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <a className="block transition hover:text-gold" href={`mailto:${company.email}`}>✉ &nbsp;{company.email}</a>
            <a className="block transition hover:text-gold" href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>☎ &nbsp;{company.phone}</a>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-[0_20px_70px_-35px_rgba(21,33,59,.35)] sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">Your name<input required name="name" className="input mt-2" placeholder="Name" autoComplete="name" /></label>
            <label className="form-label">Work email<input required type="email" name="email" className="input mt-2" placeholder="you@company.com" autoComplete="email" /></label>
            <label className="form-label sm:col-span-2">What are you planning?
              <select required name="project" className="input mt-2" defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map(service => <option key={service.id}>{service.title}</option>)}
              </select>
            </label>
            <label className="form-label sm:col-span-2">A little about your project
              <textarea required name="message" rows="4" className="input mt-2 resize-y" placeholder="Tell us about your plans, timeline and locations." />
            </label>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">This will open your email app with your enquiry ready to send.</p>
            <button type="submit" className="btn-gold shrink-0">Send your brief <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero slides={homeSlides} />
      <Stats />

      <section className="overflow-hidden py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <img src={sectorImage} alt="Light-filled contemporary studio and collaborative workspace" className="h-[320px] w-full rounded-2xl object-cover sm:h-[440px]" />
            <div className="absolute -bottom-5 right-4 rounded-xl bg-gold px-5 py-4 text-ink shadow-lg sm:-right-5 sm:px-7">
              <p className="font-display text-3xl leading-none">One partner</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider">From idea to installation</p>
            </div>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="eyebrow">Who we are</p>
            <h2 className="h2 max-w-xl">We turn retail ideas into spaces people remember.</h2>
            <p className="mt-5 leading-7 text-slate-600">{company.mission}</p>
            <p className="mt-4 leading-7 text-slate-600">{company.philosophy}</p>
            <Link to="/about" className="text-link mt-7 inline-flex items-center gap-2 font-bold">Get to know us <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">Our services</p><h2 className="h2 max-w-2xl">Everything your store needs, under one roof.</h2></div>
            <Link to="/services" className="text-link inline-flex items-center gap-2 font-bold">View all services <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map(service => (
              <Link to="/services" key={service.id} className="service-card group rounded-2xl bg-white p-7 sm:p-8">
                <span className="font-display text-5xl text-gold">{service.id}</span>
                <h3 className="mt-4 text-lg font-bold leading-snug">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.short}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy">Explore <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
          <div className="mt-7 text-center sm:hidden"><Link to="/services" className="btn bg-ink text-white">All services <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white sm:py-24">
        <div className="container-x">
          <div className="max-w-2xl"><p className="eyebrow">Why choose NOVORA</p><h2 className="h2">A better build starts with a better partner.</h2></div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([title, detail], index) => (
              <article key={title} className="border-t border-white/20 pt-5">
                <span className="font-display text-3xl text-gold">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="overflow-hidden py-16 sm:py-20">
        <div className="container-x text-center">
          <p className="eyebrow">Our customers</p>
          <h2 className="h2">Built for brands across retail.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">From new concepts to established store networks, we help create thoughtful customer experiences.</p>
        </div>
        <div className="sector-marquee mt-10" aria-label="Customer sectors we serve">
          <div className="sector-track">
            {[...customerSectors, ...customerSectors].map((sector, index) => (
              <span className="sector-pill" key={`${sector}-${index}`} aria-hidden={index >= customerSectors.length}>{sector}<span aria-hidden="true">✦</span></span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Inside the process</p>
            <h2 className="h2">Craft, care and detail in every finish.</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">A closer look at how ideas take shape—from thoughtful planning and making to the final details that bring a retail space together.</p>
            <Link to="/about" className="btn-outline mt-8">Discover our approach <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="video-frame overflow-hidden rounded-2xl">
            <video
              className="aspect-video w-full object-cover"
              controls
              preload="none"
              playsInline
              poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
              aria-label="A look at contemporary retail interior design"
            >
              <source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      </section>

      <ContactPreview />
    </>
  )
}
