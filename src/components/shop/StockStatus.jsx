import { usePreferences } from '../../locale/usePreferences'

export default function StockStatus({ product }) {
  const { t } = usePreferences()
  return <small className="mt-1 block text-base text-[#58574f]">
    {t(product.inStock ? 'In stock' : 'Not in stock')}
  </small>
}
