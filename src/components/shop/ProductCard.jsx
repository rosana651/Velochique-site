import { Link } from 'react-router-dom'
import StockStatus from './StockStatus'
import { usePreferences } from '../../locale/usePreferences'
export default function ProductCard({ product }) {
  const { language, money } = usePreferences()
  const prices = product.volumes?.map(volume => volume.price)
  return (
    <Link className="group block w-full text-left" to={`/shop/${product.id}/`}>
      <img className="aspect-[4/5] w-full rounded-sm bg-[#eeeae5] object-cover object-[center_70%]" src={import.meta.env.BASE_URL + product.images[0]} alt="" />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-2">
        <span className="font-display text-sm font-semibold tracking-wide uppercase group-hover:underline">{product.name[language]}</span>
        <span className="tabular-nums">{prices?.length
          ? `${money(Math.min(...prices))} – ${money(Math.max(...prices))}`
          : money(product.price)}</span>
      </div>
      <StockStatus product={product} />
    </Link>
  )
}
