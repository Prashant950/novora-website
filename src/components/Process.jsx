import { phases } from '../data/site'
export default function Process() {
  return (
    <section className="bg-mist py-20"><div className="container-x">
      <p className="eyebrow">Execution Framework</p><h2 className="h2">Seven phases. One accountable partner.</h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map(([t, d, o], i) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <span className="font-display text-5xl text-gold">0{i + 1}</span>
            <h3 className="mt-2 font-bold">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p>
            <p className="mt-4 border-t pt-3 text-xs font-semibold text-navy">Deliverable: {o}</p>
          </div>
        ))}
      </div>
    </div></section>
  )
}
