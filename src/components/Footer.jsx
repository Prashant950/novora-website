import { Link } from 'react-router-dom'
import { company, services } from '../data/site'

const socialLinks = [
  ['Instagram', 'https://www.instagram.com/'],
  ['LinkedIn', 'https://www.linkedin.com/'],
  ['YouTube', 'https://www.youtube.com/'],
]

export default function Footer() {
  return (
    <footer className="bg-[#111a29] text-white">
      <div className="container-x grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="NOVORA home" className="inline-block">
            <img src="/logo.png" alt="NOVORA" className="h-12 w-auto brightness-0 invert" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">{company.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/75 transition hover:border-gold hover:text-gold">{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-4 space-y-3 text-sm text-white/60">
            {[['Home', '/'], ['About us', '/about'], ['All services', '/services'], ['Contact', '/contact']].map(([label, path]) => (
              <Link key={path} to={path} className="block transition hover:text-gold">{label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">What we do</h2>
          <nav aria-label="Our services" className="mt-4 space-y-3 text-sm text-white/60">
            {services.slice(0, 4).map(service => <Link key={service.id} to="/services" className="block transition hover:text-gold">{service.title}</Link>)}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Start a conversation</h2>
          <p className="mt-4 text-sm leading-6 text-white/60">Have a store, rollout or campaign in mind? We’d love to hear about it.</p>
          <a href={`mailto:${company.email}`} className="mt-4 inline-block break-all text-sm font-semibold text-gold hover:text-white">{company.email}</a>
          <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} className="mt-2 block text-sm text-white/70 hover:text-gold">{company.phone}</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NOVORA. All rights reserved.</p>
          <p>Thoughtful spaces. Better experiences.</p>
        </div>
      </div>
    </footer>
  )
}
