import { usePreferences } from '../../locale/usePreferences'
import Action from '../ui/Action'
import Eyebrow from '../ui/Eyebrow'
import { bookingUrl } from '../../data/site'

export default function Rentals() {
  const { t } = usePreferences()
  return (
    <section id="rentals" className="rentals editorial">
      <img src={`${import.meta.env.BASE_URL}images/rentals.webp`} srcSet={`${import.meta.env.BASE_URL}images/rentals-640.webp 640w, ${import.meta.env.BASE_URL}images/rentals.webp 1600w`} sizes="(max-width: 650px) 100vw, 62vw" loading="lazy" alt={t('Detail of a road bike')} />
      <div className="editorial-copy">
        <Eyebrow>{t("Bike rentals")}</Eyebrow>
        <h2>{t("Explore the")}<br />{t("Algarve by bike.")}</h2>
        <p>{t("Premium road, gravel and e-MTB rentals, with collection in Monchique or Portimão.")}</p>
        <Action bike tone="light" href={bookingUrl}>{t("Book your bike")}</Action>
      </div>
    </section>
  )
}

