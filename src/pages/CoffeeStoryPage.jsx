import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import sections from '../data/coffeeStory.json'
import { usePreferences } from '../locale/usePreferences'

const photos = {
  'GOOD COFFEE. NO COMPROMISES.': ['coffee-white-cup.jpg', 'Espresso pouring into a ceramic cup'],
  'CONSISTENCY WITH ROOM TO EXPLORE': ['coffee-story/barista.webp', 'Barista at the espresso machine in Monchique'],
  'CRAFTED WITH CARE': ['coffee-story/latte.webp', 'Latte art beside a croissant'],
  'COFFEE & CYCLING': ['coffee-story/cyclists.webp', 'Cyclists sharing a table at Velochique']
}

export default function CoffeeStoryPage() {
  const [panel, setPanel] = useState(null)
  const { t } = usePreferences()
  const title = t('Our coffee story')
  useEffect(() => { document.title = title + ' | Velochique' }, [title])
  return <div id="top">
    <a className="skip-link" href="#main">{t('Skip to content')}</a>
    <Header openPanel={setPanel} />
    <main id="main" className="bg-[#faf9f6]">
      <article className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <h1 className="mb-8 text-4xl font-medium tracking-tight md:text-6xl">{title}</h1>
        {sections.map(({ title: heading, paragraphs }, index) => {
          const photo = photos[heading]
          return <section key={heading} className={'border-t border-stone-300 py-10 md:py-16 ' + (photo ? 'grid items-center gap-8 md:grid-cols-2 md:gap-14' : '')}>
            {photo && <img src={import.meta.env.BASE_URL + 'images/' + photo[0]} alt={t(photo[1])}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={'w-full rounded-2xl object-cover ' + (index === 0 ? 'aspect-[3/2]' : 'aspect-[4/5]') + (index === 3 ? ' md:order-last' : '')} />}
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-5 text-2xl font-semibold tracking-tight md:text-3xl">{t(heading)}</h2>
              <div className="space-y-4 text-lg leading-relaxed">{paragraphs.map(line => <p key={line}>{t(line)}</p>)}</div>
            </div>
          </section>
        })}
      </article>
    </main>
    <Footer openPanel={setPanel} />
    {panel && <SiteDialog panel={panel} close={() => setPanel(null)} openPanel={setPanel} />}
  </div>
}
