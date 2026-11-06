import { usePreferences } from '../locale/usePreferences'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import SiteDialog from '../components/SiteDialog'
import SiteLink from '../components/ui/SiteLink'
import Header from '../components/layout/Header'
import MenuSection from '../components/menu/MenuSection'
import DrinksMenu from '../components/menu/DrinksMenu'
import { menuPdfUrl, menuSections } from '../data/menu'
import '../styles/menu.css'

export default function MenuPage() {
  const { t, currency } = usePreferences()
  const [params] = useSearchParams()
  const [panel, setPanel] = useState(null)
  const category = params.get('category')
  const section = menuSections.find(item => item.id === category) ?? menuSections[0]

  const showDrinks = category === 'drinks' || section.group === 'Drinks'


  const title = t('Café menu') + ' | Velochique'
  useEffect(() => { document.title = title }, [title])

  return (
    <div id="top" className="menu-page">
      <a className="skip-link" href="#main">{t("Skip to menu")}</a>
      <Header openPanel={setPanel} />
      <main id="main" className="menu-shell">
        <div className="menu-title">
          <h1>{t(showDrinks ? 'Drinks' : 'Café menu')}</h1>
          <SiteLink href={menuPdfUrl}>{t("Original menu (PDF) ↗")}</SiteLink>
        </div>
        {currency === 'USD' && <p className="mt-3 text-sm">{t('USD prices are approximate.')}</p>}
        {showDrinks ? <DrinksMenu selected={category === 'drinks' ? params.get('type') : category} /> : <MenuSection section={section} />}
        <p className="menu-note">{t("Prices include VAT. Substitutions may cost extra. Please tell the team about any allergies or intolerances when ordering.")}</p>
      </main>
      <Footer openPanel={setPanel} />
      {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
    </div>
  )
}

