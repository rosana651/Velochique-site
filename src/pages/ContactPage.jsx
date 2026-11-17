import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import { locations } from '../data/site'
import { usePreferences } from '../locale/usePreferences'

const recipients = {
  monchique: 'hello@velochique.com',
  portimao: 'vr@velochique.com',
}

function ContactForm({ location }) {
  const { t } = usePreferences()
  const [status, setStatus] = useState('idle')
  const [reason, setReason] = useState('')
  const recipient = recipients[location.id]
  const inputStyle = 'mt-2 block w-full rounded-xl border border-[#bcb9b0] bg-white px-3 py-3'

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    data._url = window.location.href
    setReason('')
    setStatus('sending')
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || String(result?.success) !== 'true') {
        setReason(typeof result?.message === 'string' ? result.message : `FormSubmit · HTTP ${response.status}`)
        setStatus('error')
        return
      }
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return <form className="mt-7 border-t border-[#c6c3ba] pt-6" action={`https://formsubmit.co/ajax/${recipient}`} method="post" onSubmit={submit}>
    <input type="hidden" name="_subject" value={`Velochique · ${location.name}`} />
    <fieldset disabled={status === 'sending'} className="grid gap-5 sm:grid-cols-2">
      <label>{t('Your name')}<input className={inputStyle} name="name" autoComplete="name" required /></label>
      <label>{t('Your email')}<input className={inputStyle} name="email" type="email" autoComplete="email" required /></label>
      <label className="sm:col-span-2">{t('Message')}<textarea className={inputStyle} name="message" rows={6} required /></label>
      <a className="justify-self-start underline underline-offset-2 sm:col-span-2" href={`mailto:${recipient}`}>{recipient}</a>
      <button className="action action--dark justify-self-start disabled:opacity-60" type="submit">{t(status === 'sending' ? 'Sending…' : 'Send message')}</button>
    </fieldset>
    <div role="status" className="mt-4">
      {status === 'success' && t('Thank you. Your message has been submitted.')}
      {status === 'error' && <>
        <p>{t('We couldn’t confirm submission.')} {reason || t('No response from the email service.')}</p>
      </>}
    </div>
  </form>
}

export default function ContactPage() {
  const { t } = usePreferences()
  const [params] = useSearchParams()
  const [panel, setPanel] = useState(null)
  const location = locations.find(item => item.id === params.get('location')) ?? locations[0]
  const title = `${t('Contact us')} · ${location.name} | Velochique`
  useEffect(() => { document.title = title }, [title])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.id])

  return <div id="top" className="flex min-h-dvh flex-col">
    <a className="skip-link" href="#main">{t('Skip to content')}</a>
    <Header openPanel={setPanel} />
    <main id="main" className="flex-1 bg-[#faf9f6] px-[5%] py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">{t('Contact us')}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-wide md:text-5xl">{location.name}</h1>
        <address className="mt-2 flex flex-col items-start gap-1 not-italic">
          <span>{location.address}</span>
          <span>{location.phone}</span>
        </address>
        <ContactForm key={location.id} location={location} />
      </div>
    </main>
    <Footer openPanel={setPanel} />
    {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
  </div>
}
