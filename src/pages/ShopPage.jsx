import { usePreferences } from '../locale/usePreferences'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/shop/ProductCard'
import SiteDialog from '../components/SiteDialog'
import { products } from '../data/site'

const ProductDetails = lazy(() => import('../components/shop/ProductDetails'))

export default function ShopPage() {
  const { t, language } = usePreferences()
  const { productId } = useParams()
  const product = products.find(item => item.id === productId)
  const [panel, setPanel] = useState(null)


  const title = (product?.name[language] ?? t(productId ? 'Product unavailable' : 'Shop')) + ' | Velochique'
  useEffect(() => { document.title = title }, [title])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [productId])

  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main">{t("Skip to products")}</a>
      <Header openPanel={setPanel} />
      <main id="main" className="w-full flex-1 border-t border-[#dedbd3] bg-[#faf9f6]">
        <div className="mx-auto max-w-[1600px] px-[4.2%] py-8 md:py-14">
          {productId ? <>
            <Link to="/shop/" className="mb-6 inline-flex min-h-11 items-center gap-2 hover:underline">← {t('Back to shop')}</Link>
            {product ? <Suspense fallback={<p role="status">{product.name[language]}…</p>}>
              <ProductDetails product={product} />
            </Suspense> : <h1>{t('Product unavailable')}</h1>}
          </> : <>
          <h1 className="text-4xl font-semibold tracking-widest md:text-6xl">{t("Shop")}</h1>
          <ul aria-label={t('Products')} className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-[#dedbd3] pt-6 md:grid-cols-4 lg:gap-x-6">
            {products.map(product => (
              <li key={product.id}><ProductCard product={product} /></li>
            ))}
          </ul>
          </>}
        </div>
      </main>
      <Footer openPanel={setPanel} />
      {panel && <SiteDialog panel={panel} openPanel={setPanel} close={() => setPanel(null)} />}
    </div>
  )
}
