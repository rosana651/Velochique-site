import { usePreferences } from '../locale/usePreferences'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Locations from '../components/sections/Locations'
import Coffee from '../components/sections/Coffee'
import Rentals from '../components/sections/Rentals'
import Collection from '../components/sections/Collection'
import SiteDialog from '../components/SiteDialog'
import usePageMotion from '../hooks/usePageMotion'

export default function HomePage() {
  const { t } = usePreferences()
  const [panel, setPanel] = useState(null)
  const page = useRef(null)
  usePageMotion(page)
  const title = 'Velochique — ' + t('Cycling & Specialty Coffee in the Algarve')
  useEffect(() => { document.title = title }, [title])

  return (
    <div id="top" ref={page}>
      <a className="skip-link" href="#main">{t("Skip to content")}</a>
      <Header openPanel={setPanel} />
      <main id="main">
        <Hero />
        <Locations openPanel={setPanel} />
        <Coffee openPanel={setPanel} />
        <Rentals />
        <Collection openPanel={setPanel} />
      </main>
      <Footer openPanel={setPanel} />
      {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
    </div>
  )
}
