import { usePreferences } from '../../locale/usePreferences'
import Action from '../ui/Action'
import Eyebrow from '../ui/Eyebrow'
import { products } from '../../data/site'

export default function Collection({ openPanel }) {
  const { t } = usePreferences()
  return (
    <section id="collection" className="collection">
      <div>
        <Eyebrow>{t("Merchandise")}</Eyebrow>
        <h2>{t("The Velochique")} <br />{t("collection")}</h2>
        <p>{t("Cycling kit, casual wear and everyday essentials for life on and off the bike.")}</p>
        <Action href="/shop">{t("View shop")}</Action>
      </div>
      <ul className="product-rail">{products.map(item => (
        <li key={item.id}><button onClick={() => openPanel(item.id)}>
          <div className="product-image"><img src={`${import.meta.env.BASE_URL}images/${item.id}.webp`} alt="" loading="lazy" /></div>
          <span>{t(item.name)}</span>
        </button></li>
      ))}</ul>
    </section>
  )
}

