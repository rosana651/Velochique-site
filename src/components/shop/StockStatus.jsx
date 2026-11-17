import { usePreferences } from '../../locale/usePreferences'

export default function StockStatus({ product }) {
  const { t, language } = usePreferences()
  return <small className="mt-1 block text-base text-[#58574f]">
    {product.availability?.[language] ?? t(product.inStock ? 'In stock' : 'Not in stock')}
  </small>
}
