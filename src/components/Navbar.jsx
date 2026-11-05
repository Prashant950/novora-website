import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRightIcon, PhoneIcon, MailIcon } from './Icons'
import Logo from './Logo'
import { company } from '../data/site'

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Our Services', '/services'],
  ['Contact Us', '/contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Bulletproof background scroll lock when mobile menu is active
  useEffect(() => {
    if (open) {
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
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const cls = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 hover:text-gold ${
      isActive ? 'text-gold font-bold' : 'text-slate-800'
    }`

  const closeMenu = () => setOpen(false)

  // Mobile Drawer & Overlay Portal component (rendered directly on document.body)
  const mobilePortal = mounted && typeof document !== 'undefined' ? (
    createPortal(
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${
          open ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Dark Dimmer Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        {/* Slide-over Drawer from Right to Left */}
        <div
          className={`absolute top-0 right-0 h-full w-[80vw] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between p-6 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div>
            {/* Drawer Header: Logo + Close ✕ Button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Link to="/" onClick={closeMenu} className="inline-block" aria-label="NOVORA Home">
                <Logo variant="dark" className="h-7 w-auto" />
              </Link>
              <button
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-700 transition hover:bg-slate-100 hover:text-ink active:scale-90"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links (Auto closes on click) */}
            <nav aria-label="Mobile Navigation" className="mt-6 flex flex-col gap-1.5">
              {links.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-gold/15 text-gold font-bold'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-gold'
                    }`
                  }
                >
                  <span>{label}</span>
                  <span className="text-xs text-slate-400">›</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Actions (Auto closes on click) */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="btn-gold w-full justify-center text-xs sm:text-sm font-bold shadow-md"
            >
              <span>Request a Quote</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>

            <div className="space-y-2 text-xs text-slate-500 pt-1">
              <a
                href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <PhoneIcon className="h-3.5 w-3.5 text-gold" />
                <span>{company.phone}</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-gold transition-colors truncate"
              >
                <MailIcon className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate">{company.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  ) : null

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm transition-all">
        <div className="container-x flex h-[72px] items-center justify-between sm:h-20">
          <Link to="/" aria-label="NOVORA Home" className="inline-block transition-opacity hover:opacity-90">
            <Logo variant="dark" className="h-8 w-auto sm:h-10" />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden items-center gap-8 md:flex">
            {links.map(([l, to]) => (
              <NavLink key={to} to={to} className={cls}>
                {l}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-gold group !min-h-10 !px-5 !py-2.5 text-xs sm:text-sm">
              <span>Request a Quote</span>
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl font-bold text-ink transition hover:border-gold md:hidden active:scale-95"
            aria-label="Open mobile menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Portal Mounted Mobile Drawer */}
      {mobilePortal}
    </>
  )
}
