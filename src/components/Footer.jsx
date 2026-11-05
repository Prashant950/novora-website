import { Link } from 'react-router-dom'
import { company, services } from '../data/site'
import Logo from './Logo'
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  XIcon,
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ArrowUpRightIcon,
} from './Icons'

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: InstagramIcon,
    hoverBg: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icon: LinkedInIcon,
    hoverBg: 'hover:bg-[#0077b5]',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/',
    icon: YouTubeIcon,
    hoverBg: 'hover:bg-[#ff0000]',
  },
  {
    name: 'X (Twitter)',
    url: 'https://twitter.com/',
    icon: XIcon,
    hoverBg: 'hover:bg-white hover:text-black',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/910000000000',
    icon: WhatsAppIcon,
    hoverBg: 'hover:bg-[#25D366]',
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0d1422] text-white overflow-hidden border-t border-white/10">
      {/* Decorative ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-navy/40 blur-[100px]" />

      <div className="container-x relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="NOVORA Home" className="inline-block transition-opacity hover:opacity-90">
              <Logo variant="light" className="h-9 w-auto sm:h-11" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {company.tagline} Single-point accountability for turnkey retail fit-outs, custom store fixtures, facade engineering, and nation-wide rollouts.
            </p>

            {/* Social Media Icons */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Connect With Us</p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {socialLinks.map(item => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.name}
                      className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:text-white ${item.hoverBg} shadow-sm`}
                    >
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>120,000 Sq.Ft Factory · 40+ Cities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="font-display text-base font-semibold tracking-wide text-white">Explore</h3>
            <nav aria-label="Footer Navigation" className="mt-4 space-y-2.5 text-sm">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Our Services', '/services'],
                ['Contact Us', '/contact'],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-1.5 text-slate-400 transition-colors duration-200 hover:text-gold hover:translate-x-0.5"
                >
                  <span className="text-xs text-gold/60">›</span> {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold tracking-wide text-white">What We Build</h3>
            <nav aria-label="Retail Services" className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 5).map(service => (
                <Link
                  key={service.id}
                  to="/services"
                  className="block truncate text-slate-400 transition-colors duration-200 hover:text-gold"
                  title={service.title}
                >
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold tracking-wide text-white">Get In Touch</h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Planning a new store, nationwide brand rollout, or flagship renovation?
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <a
                href={`mailto:${company.email}`}
                className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-gold"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
                  <MailIcon className="h-4 w-4" />
                </div>
                <span className="truncate">{company.email}</span>
              </a>

              <a
                href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-gold"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <span>{company.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-slate-400 text-xs pt-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold">
                  <MapPinIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-300">Corporate & Plant</p>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-0.5">Industrial Zone, Pan-India Dispatch Center</p>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold/15 border border-gold/30 px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Start Project Inquiry <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#090e18]/80">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NOVORA Interiors & Fit-Outs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              <span>Powered by</span>
              <a
                href="https://www.uniquedigitaltech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gold transition-colors hover:text-white hover:underline underline-offset-4"
              >
                Unique Digital Tech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
