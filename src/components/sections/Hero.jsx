import { usePreferences } from '../../locale/usePreferences'
import Action from '../ui/Action'
import Eyebrow from '../ui/Eyebrow'
import { bookingUrl } from '../../data/site'

export default function Hero() {
  const { t } = usePreferences()
  return (
    <section className="hero photo-section" aria-labelledby="hero-title">
      <img className="scene" src="/images/hero.webp" alt="" fetchPriority="high" />
      <div className="hero-copy relative">
        <Eyebrow>{t("Ride – sip – repeat")}</Eyebrow>
        <h1 id="hero-title">Velochique</h1>
        <p>{t("Specialty coffee, great food and a cycling community in the heart of the Algarve.")}</p>
        <div className="hero-actions flex flex-wrap gap-3">
          <Action href="#locations" tone="light">{t("Explore our locations")}</Action>
          <Action href={bookingUrl} tone="outline" bike>{t("Book a bike rental")}</Action>
        </div>
      </div>
    </section>
  )
}
