import { usePreferences } from '../../locale/usePreferences'
export default function ProductCard({ product, onSelect }) {
  const { t, money } = usePreferences()
  return (
    <button className="group w-full text-left" aria-haspopup="dialog" onClick={() => onSelect(product.id)}>
      <img className="aspect-[4/5] w-full bg-[#eeeae5] object-contain" src={`${import.meta.env.BASE_URL}images/${product.id}.webp`} alt="" />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-2">
        <span className="font-display text-sm font-semibold tracking-wide uppercase group-hover:underline">{t(product.name)}</span>
        <span className="tabular-nums">{money(product.price)}</span>
      </div>
    </button>
  )
}
