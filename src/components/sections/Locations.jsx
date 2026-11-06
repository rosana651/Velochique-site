import { usePreferences } from '../../locale/usePreferences'
import { locations } from '../../data/site'
import Action from '../ui/Action'

function LocationCard({ location, openPanel }) {
  const { t } = usePreferences()
  const mountain = location.id === 'monchique'
  return (
    <article className="location-card photo-section">
      <img className="scene" src={`/images/${location.id}.webp`} srcSet={`/images/${location.id}-640.webp 640w, /images/${location.id}.webp 1600w`} sizes="(max-width: 650px) 100vw, 49vw" alt="" />
      <div className="location-copy relative">
        <p className="overline">Velochique</p>
        <h3>{mountain ? 'Monchique' : <>Vista Rio<br />Portimão</>}</h3>
        <span className="short-rule" aria-hidden="true" />
        <p className="location-desc">{t(location.description)}</p>
        <Action tone="outline" onClick={() => openPanel(location.id)}>{t('View')} {mountain ? 'Monchique' : 'Portimão'}</Action>
      </div>
    </article>
  )
}

export default function Locations({ openPanel }) {
  const { t } = usePreferences()
  return <section id="locations" className="locations" aria-label={t('Our locations')}>{locations.map(location => <LocationCard key={location.id} location={location} openPanel={openPanel} />)}</section>
}

