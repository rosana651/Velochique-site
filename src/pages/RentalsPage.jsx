import { useEffect, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import { locations } from '../data/site'
import bikes from '../data/rentalBikes.json'
import { usePreferences } from '../locale/usePreferences'

const rentalEmail = 'ciclo@velochique.com'
const extras = [
  ['Pedals (SPD)', 5, 'pedals-shimano-spd'],
  ['Pedals (SPD-SL)', 5, 'pedals-shimano-spd-sl'],
  ['Pedals (Look)', 5, 'pedals-look'],
  ['Phone mount', 10, 'phone-mount'],
  ['GPS device', 25, 'gps-device-garmin-edge-830'],
  ['Child seat (up to 22 kg)', 25, 'child-bike-seat'],
]
const input = 'mt-1 block w-full min-w-0 rounded-lg border border-stone-300 bg-[#faf9f6] px-3 py-2.5 font-normal'

function localDay(offset = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function Booking({ bike, drafts, close }) {
  const { t, money } = usePreferences()
  const modal = useRef(null)
  const draft = drafts.current.get(bike.id)
  const [start, setStart] = useState(() => draft?.start ?? localDay())
  const [end, setEnd] = useState(() => draft?.end ?? localDay(1))
  const [qty, setQty] = useState(draft?.quantity ?? 1)
  const [selected, setSelected] = useState(draft?.extras ?? [])
  const [status, setStatus] = useState('idle')
  const days = Math.max(0, (Date.parse(end) - Date.parse(start)) / 86400000)
  const tomorrow = start ? new Date(Date.parse(start) + 86400000).toISOString().slice(0,10) : localDay(1)
  const total = qty * (bike.price * days + selected.reduce((sum, name) => sum + extras.find(([key]) => key === name)[1], 0))
  useEffect(() => {
    const dialog = modal.current
    const previous = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previous }
  }, [])

  function saveDraft(event) {
    const data = new FormData(event.currentTarget)
    drafts.current.set(bike.id, { ...Object.fromEntries(data), extras: data.getAll('extras') })
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending' || !(days > 0)) return
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const submittedDraft = drafts.current.get(bike.id)
    setStatus('sending')
    try {
      const result = await fetch('https://formsubmit.co/ajax/' + rentalEmail, {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ ...data, bike: bike.name, extras: selected.join(', ') || '—', estimate: money(total), _subject: 'Bike rental request · ' + bike.name, _url: window.location.href })
      })
      if (!result.ok || String((await result.json()).success) !== 'true') throw new Error()
      if (drafts.current.get(bike.id) === submittedDraft) drafts.current.delete(bike.id)
      setStatus('success')
    } catch { setStatus('error') }
  }

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return
    const box = event.currentTarget.getBoundingClientRect()
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close()
  }

  return <dialog ref={modal} aria-labelledby="bike-title" onCancel={close} onClick={closeOnBackdrop} className="fixed inset-0 m-auto max-h-[92dvh] w-[min(94vw,660px)] overflow-auto rounded-2xl bg-white p-6 text-stone-900 shadow-2xl backdrop:bg-black/65 md:p-8">
    <div className="flex items-start justify-between gap-4">
      <h2 id="bike-title" className="text-xl font-semibold">{t(bike.name)}</h2>
      <button type="button" className="grid size-12 shrink-0 place-items-center rounded-full text-4xl leading-none hover:bg-stone-100" onClick={close} aria-label={t('Close dialog')}>×</button>
    </div>
    {status === 'success' ? <p role="status" className="mt-6">{t('Request received. We will confirm availability by email.')}</p> :
      <form onChange={saveDraft} onSubmit={submit}>
        <p className="my-5 text-xl">{t('From')} {money(bike.price)}</p>
        <fieldset disabled={status === 'sending'} className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
          {[['pickup','Pick-up'],['return','Return']].map(([name,label]) => <label key={name}>{t(label)}<select defaultValue={draft?.[name]} name={name} className={input}>{locations.map(l => <option key={l.id}>{l.name}</option>)}</select></label>)}
          <label>{t('Preferred size')}<select defaultValue={draft?.size} name="size" className={input}>{['S','M','L','XL'].map(size => <option key={size}>{size}</option>)}</select></label>
          <label>{t('Bikes')}<input className={input} type="number" name="quantity" min="1" required value={qty} onChange={e => setQty(e.target.value)} /></label>
          <label>{t('Pick-up date')}<input className={input} type="date" name="start" required min={localDay()} value={start} onChange={e => setStart(e.target.value)} /></label>
          <label>{t('Return date')}<input className={input} type="date" name="end" required min={tomorrow} value={end} onChange={e => setEnd(e.target.value)} /></label>
          <fieldset className="col-span-full"><legend>{t('Extras per bike')}</legend><div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {extras.map(([name, price, image]) => <label key={name} className="relative flex cursor-pointer flex-col gap-1 rounded-xl border border-stone-300 p-3 text-sm hover:border-stone-600 has-checked:border-black has-checked:ring-1 has-checked:ring-black has-focus-visible:outline-2">
              <input type="checkbox" name="extras" value={name} className="absolute top-2 right-2 size-4 cursor-pointer accent-black"
                checked={selected.includes(name)}
                onChange={e => setSelected(e.target.checked ? [...selected, name] : selected.filter(v => v !== name))} />
              <img src={import.meta.env.BASE_URL + 'images/rentals/extras/' + image + '.webp'} alt=""
                className="mb-1 aspect-square w-full object-contain" />
              <span className="font-medium">{t(name)}</span>
              <span>{money(price)}</span>
            </label>)}
          </div></fieldset>
          <div className="col-span-full rounded-lg bg-[#f5f2eb] p-4" aria-live="polite"><strong>{t('Estimated total')} · {days > 0 && qty > 0 ? money(total) : '—'}</strong>
            <p className="mt-1 text-sm">{t('Final price and availability will be confirmed by email.')}</p></div>
          <label>{t('Your name')}<input className={input} name="name" defaultValue={draft?.name} pattern={'.*\\S.*'} autoComplete="name" required /></label>
          <label>{t('Your email')}<input className={input} type="email" name="email" defaultValue={draft?.email} autoComplete="email" required /></label>
          <button className="action action--dark col-span-full" type="submit">{t(status === 'sending' ? 'Sending…' : 'Request booking')}</button>
          <p className="col-span-full text-center text-sm">{t('Booking requests are sent to')} <a className="underline" href={'mailto:' + rentalEmail}>{rentalEmail}</a></p>
        </fieldset>
        {status === 'error' && <p role="alert" className="mt-3">{t('Could not send your request. Please try again.')}</p>}
      </form>}
  </dialog>
}

export default function RentalsPage() {
  const { t, money } = usePreferences()
  const [panel,setPanel] = useState(null)
  const drafts = useRef(new Map())
  const [bike,setBike] = useState(null)
  const title = t('Bike rentals')
  useEffect(() => { document.title = title + ' | Velochique' }, [title])
  return <div id="top"><a className="skip-link" href="#main">{t('Skip to content')}</a><Header openPanel={setPanel}/>
    <main id="main" className="bg-[#faf9f6] px-6 py-12 md:py-16"><div className="mx-auto max-w-7xl">
      <h1 className="mb-10 text-4xl font-medium tracking-tight md:text-6xl">{title}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{bikes.map(item => <article key={item.id} className="flex flex-col border border-stone-200 bg-white">
        <img src={import.meta.env.BASE_URL + 'images/rentals/' + item.id + '.webp'} alt={t(item.name)} loading="lazy" className="aspect-[3/2] w-full object-contain p-4"/>
        <div className="flex flex-1 flex-col items-start border-t border-stone-100 p-6"><h2 className="text-lg font-semibold">{t(item.name)}</h2><p className="mt-2 mb-5">{t('From')} {money(item.price)}</p>
          <button className="action action--dark mt-auto" aria-haspopup="dialog" onClick={() => setBike(item)}>{t('Book your bike')}</button></div>
      </article>)}</div>
    </div></main><Footer openPanel={setPanel}/>
    {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)}/>}
    {bike && <Booking bike={bike} drafts={drafts} close={() => setBike(null)}/>}
  </div>
}
