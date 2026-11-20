import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import SiteLink from '../components/ui/SiteLink'
import { usePreferences } from '../locale/usePreferences'
import { aboutParagraphs as copy } from '../data/about'

function Photo({ name, alt, portrait = false, position = 'center' }) {
  const { t } = usePreferences()
  const base = `${import.meta.env.BASE_URL}images/about/${name}`
  return <img src={`${base}-1400.jpg`} srcSet={`${base}-640.jpg 640w, ${base}-1400.jpg 1400w`}
    sizes="(max-width: 767px) 90vw, 45vw" alt={t(alt)} loading="lazy" decoding="async"
    width="1400" height={portrait ? 2488 : 934}
    className={`block w-full object-cover ${portrait ? 'aspect-[3/4]' : 'aspect-[3/2]'}`}
    style={{ objectPosition: position }} />
}

export default function AboutPage() {
  const { t } = usePreferences()
  const [panel, setPanel] = useState(null)
  const title = `${t('About us')} | Velochique`
  useEffect(() => { document.title = title }, [title])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  const paragraphs = (start, end) => copy.slice(start, end).map(text => <p key={text}>{t(text)}</p>)

  return <div id="top" className="flex min-h-dvh flex-col">
    <a className="skip-link" href="#main">{t('Skip to content')}</a>
    <Header openPanel={setPanel} />
    <main id="main" className="bg-[#faf9f6]">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <img src={`${import.meta.env.BASE_URL}images/about/monchique-terrace.jpg`}
          alt={t('The Velochique café terrace in Monchique, seen from the square')}
          width="1536" height="1024" fetchPriority="high"
          className="block aspect-[3/2] w-full rounded-2xl object-cover object-[center_62%] shadow-lg md:aspect-[2.63/1] md:rounded-3xl" />
        <div className="mt-8 max-w-3xl md:mt-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[.22em]">{t('About us')}</p>
          <h1 className="mt-4 text-balance text-4xl leading-tight font-medium tracking-tight lg:text-5xl">{t(copy[0])}</h1>
          <p className="mt-5 text-xl text-[#9b532d] md:text-2xl">{t(copy[1])}</p>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#55564f]">{paragraphs(2, 5)}</div>
        </div>
      </section>

      <section aria-labelledby="monchique-title" className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <Photo name="monchique-exterior" alt="Velochique bicycle sign outside the café in Monchique" portrait />
            <div className="pt-10"><Photo name="monchique-bikes" alt="Bikes and Monchique clothing inside Velochique" portrait /></div>
          </div>
          <div>
            <p className="eyebrow text-[#9b532d]">Monchique · 2020</p>
            <h2 id="monchique-title" className="mt-4 text-3xl font-medium tracking-wide md:text-4xl">Monchique</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#55564f]">{paragraphs(5, 7)}</div>
            <SiteLink href="/menu/?location=monchique" className="action action--dark mt-8">{t('Menu')} · Monchique</SiteLink>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-5">
          <Photo name="monchique-matcha" alt="Matcha and a croissant at Velochique Monchique" portrait position="center 70%" />
          <Photo name="monchique-food" alt="Freshly prepared colourful bowls at Velochique Monchique" portrait />
        </div>
      </section>

      <section aria-labelledby="portimao-title" className="bg-[#eeece5] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow text-[#9b532d]">Vista Rio · Portimão · 2026</p>
              <h2 id="portimao-title" className="mt-4 max-w-xl text-3xl leading-tight font-medium md:text-4xl">{t(copy[7])}</h2>
            </div>
            <div>
              <div className="space-y-5 text-lg leading-relaxed text-[#55564f]">{paragraphs(8, 10)}</div>
              <SiteLink href="/menu/?location=portimao" className="action action--dark mt-8">{t('Menu')} · Portimão</SiteLink>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:mt-14">
            <Photo name="portimao-interior" alt="The coffee bar and interior of Velochique Vista Rio in Portimão" />
            <Photo name="portimao-espresso" alt="Espresso pouring into a red cup at Velochique Vista Rio" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
        <h2 className="text-3xl leading-tight font-medium md:text-4xl">{t(copy[10])}</h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#55564f]">{paragraphs(11, 14)}</div>
        <p className="mt-10 font-display text-xl font-semibold">{t(copy[14])}</p>
      </section>
    </main>
    <Footer openPanel={setPanel} />
    {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
  </div>
}
