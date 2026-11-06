import { usePreferences } from '../../locale/usePreferences'
import Action from '../ui/Action'
import Eyebrow from '../ui/Eyebrow'

export default function Coffee({ openPanel }) {
  const { t } = usePreferences()
  return (
    <section id="coffee" className="coffee editorial">
      <img className="coffee-photo" src={`${import.meta.env.BASE_URL}images/coffee.webp`} srcSet={`${import.meta.env.BASE_URL}images/coffee-640.webp 640w, ${import.meta.env.BASE_URL}images/coffee.webp 1600w`} sizes="(max-width: 650px) 100vw, 45vw" loading="lazy" alt={t('Espresso pouring into a ceramic cup')} />
      <div className="editorial-copy relative">
        <Eyebrow>{t("Specialty coffee")}</Eyebrow>
        <h2>{t("Great rides")}<br />{t("deserve")}<br />{t("great coffee.")}</h2>
        <p>{t("At Velochique, coffee is more than just a drink. We work with carefully selected coffee roasters who share our passion for quality, flavour and sustainability.")}</p>
        <Action onClick={() => openPanel('coffee')}>{t("Our coffee story")}</Action>
      </div>
    </section>
  )
}

