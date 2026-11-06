import { usePreferences } from '../locale/usePreferences'
import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/shop/ProductCard'
import SiteDialog from '../components/SiteDialog'
import { products } from '../data/site'

export default function ShopPage() {
  const { t, currency } = usePreferences()
  const [panel, setPanel] = useState(null)


  const title = t('Shop') + ' | Velochique'
  useEffect(() => { document.title = title }, [title])

  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main">{t("Skip to products")}</a>
      <Header openPanel={setPanel} />
      <main id="main" className="w-full flex-1 border-t border-[#dedbd3]">
        <div className="mx-auto max-w-[1600px] px-[4.2%] py-8 md:py-14">
          <h1 className="text-4xl font-semibold tracking-widest md:text-6xl">{t("Shop")}</h1>
          <p className="mt-3 max-w-lg">{t("Cycling kit, casual wear and everyday essentials for life on and off the bike.")}</p>
          {currency === 'USD' && <p className="mt-3 text-sm">{t('USD prices are approximate.')}</p>}
          <ul aria-label={t('Products')} className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-[#dedbd3] pt-6 md:grid-cols-3 xl:grid-cols-5">
            {products.map(product => (
              <li key={product.id}><ProductCard product={product} onSelect={setPanel} /></li>
            ))}
          </ul>
        </div>
      </main>
      <Footer openPanel={setPanel} />
      {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
    </div>
  )
}
