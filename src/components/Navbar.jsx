import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
const links = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Contact', '/contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const cls = ({ isActive }) => `text-sm font-semibold transition hover:text-gold ${isActive ? 'text-gold' : 'text-ink'}`
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between sm:h-20">
        <Link to="/" aria-label="NOVORA home"><img src="/logo.png" alt="NOVORA" className="h-10 w-auto sm:h-12" /></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {links.map(([l, to]) => <NavLink key={to} to={to} className={cls}>{l}</NavLink>)}
          <Link to="/contact" className="btn bg-ink text-white hover:bg-gold hover:text-ink">Request a quote <span aria-hidden="true">↗</span></Link>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-xl text-ink transition hover:border-gold md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >{open ? '×' : '☰'}</button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="container-x flex flex-col gap-1 border-t border-slate-200 bg-white pb-6 pt-3 md:hidden">
          {links.map(([l, to]) => <NavLink key={to} to={to} className={({ isActive }) => `${cls({ isActive })} rounded-lg px-3 py-3`} onClick={() => setOpen(false)}>{l}</NavLink>)}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3">Request a quote <span aria-hidden="true">↗</span></Link>
        </nav>
      )}
    </header>
  )
}
