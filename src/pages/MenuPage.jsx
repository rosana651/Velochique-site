import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePreferences } from '../locale/usePreferences'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import { locations } from '../data/site'
import { restaurantMenus } from '../data/restaurantMenus'

function MenuContent({ location }) {
  const { t } = usePreferences()
  const sections = restaurantMenus[location.id]
  const [active, setActive] = useState(sections[0].id)
  const navigation = useRef(null)
  const content = useRef(null)
  const frame = useRef(0)

  useEffect(() => {
    document.title = 'Menu · ' + location.name + ' | Velochique'
    window.scrollTo({ top: 0, behavior: 'instant' })
    frame.current = 0
    const update = () => {
      frame.current = 0
      const offset = window.innerWidth < 768 ? 180 : 135
      const elements = [...content.current.querySelectorAll('[data-menu-category]')]
      const current = elements.filter(element => element.getBoundingClientRect().top <= offset).at(-1) ?? elements[0]
      setActive(current.id)
    }
    const schedule = () => { if (!frame.current) frame.current = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [location])

  useEffect(() => {
    const nav = navigation.current
    const link = nav.querySelector('[aria-current="location"]')
    if (!link) return
    const box = link.getBoundingClientRect()
    const bounds = nav.getBoundingClientRect()
    if (window.innerWidth < 768) nav.scrollLeft += box.left - bounds.left - (bounds.width - box.width) / 2
    else if (box.top < bounds.top || box.bottom > bounds.bottom) nav.scrollTop += box.top - bounds.top - 12
  }, [active])

  return <main id="main" className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
    <div className="py-9 md:py-14">
      <p className="mb-3 text-xs font-semibold tracking-[.25em] text-stone-500">VELOCHIQUE</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">MENU</h1>
      <nav aria-label={t('Choose a café')} className="mt-6 flex flex-wrap gap-2">
        {locations.map(branch => <Link key={branch.id} to={'/menu/?location=' + branch.id} aria-current={branch.id === location.id ? 'page' : undefined} className={'rounded-full border px-5 py-3 text-sm font-medium transition-colors ' + (branch.id === location.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white hover:border-stone-900')}>{branch.name}</Link>)}
      </nav>
    </div>
    <div className="grid items-start gap-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
      <nav ref={navigation} aria-label={t('Menu categories')} className="sticky top-[96px] z-4 min-w-0 -mx-5 flex gap-1 overflow-x-auto border-y border-stone-200 bg-[#faf9f6] px-5 py-3 md:top-[112px] md:mx-0 md:max-h-[calc(100dvh-132px)] md:flex-col md:overflow-y-auto md:border-0 md:px-0 md:py-0">
        {sections.map(category => <a key={category.id} href={'#' + category.id} aria-current={active === category.id ? 'location' : undefined} onClick={event => {
          event.preventDefault()
          document.getElementById(category.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
        }} className={'shrink-0 rounded-lg px-4 py-3 text-sm font-medium transition-colors md:shrink md:leading-5 ' + (active === category.id ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200 hover:text-stone-950')}>{t(category.name)}</a>)}
      </nav>
      <div ref={content} className="min-w-0">
        {sections.map(category => <section key={category.id} id={category.id} data-menu-category aria-labelledby={category.id + '-title'} className="mb-12 scroll-mt-[176px] md:mb-16 md:scroll-mt-[128px]">
          <header className="mb-2 border-b-2 border-stone-900 pb-5">
            <h2 id={category.id + '-title'} className="text-2xl font-semibold normal-case! tracking-tight md:text-3xl">{t(category.name)}</h2>
            {category.note && <p className="mt-2 text-sm text-stone-500">{t(category.note)}</p>}
          </header>
          <ul className="divide-y divide-dashed divide-stone-200">
            {category.items.map(item => <li key={item.id} className="grid grid-cols-[minmax(0,1fr)_100px] items-start gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:gap-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_200px]">
              <div className="min-w-0">
                <h3 className="text-base font-semibold normal-case! leading-snug md:text-lg">{t(item.name)}</h3>
                <p className="mt-2 text-sm font-semibold text-[#b95322] tabular-nums md:text-base">{t(item.price)}</p>
                {item.description && <p className="mt-3 text-sm leading-6 text-stone-600">{t(item.description)}</p>}
              </div>
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                {item.image ? <img src={item.image} alt={t(item.name)} loading="lazy" className="h-full w-full object-cover" /> : <span className="text-sm font-medium tracking-wider text-stone-500 sm:text-base">N/A</span>}
              </div>
            </li>)}
          </ul>
        </section>)}
        <p className="border-t border-stone-300 pt-6 text-xs leading-6 text-stone-500">{t('Prices include VAT. Substitutions may cost extra. Please tell the team about any allergies or intolerances when ordering.')}</p>
      </div>
    </div>
  </main>
}

export default function MenuPage() {
  const [params] = useSearchParams()
  const [panel, setPanel] = useState(null)
  const { t } = usePreferences()
  const location = locations.find(branch => branch.id === params.get('location')) ?? locations[0]
  return <div id="top" className="bg-[#faf9f6] font-display">
    <a className="skip-link" href="#main">{t('Skip to menu')}</a>
    <Header openPanel={setPanel} />
    <MenuContent key={location.id} location={location} />
    <Footer openPanel={setPanel} />
    {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
  </div>
}

