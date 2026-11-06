import { usePreferences } from '../../locale/usePreferences'
import { locations, socialLinks } from '../../data/site'
import Icon from '../ui/Icon'
import SiteLink from '../ui/SiteLink'

export default function Footer({ openPanel }) {
  const { t } = usePreferences()
  return (
    <footer id="contact" className="footer-bar">
      <a className="wordmark" href="#top">Velochique</a>
      <div className="footer-locations">
        {locations.map(location => (
          <button key={location.id} aria-haspopup="dialog" onClick={() => openPanel('map-' + location.id)}>
            <strong>{location.name}</strong>
            <small>{location.address}</small>
          </button>
        ))}
      </div>
      <nav className="footer-socials" aria-label={t('Social media')}>
        {socialLinks.map(({ name, icon, href }) => (
          <SiteLink key={name} href={href} aria-label={name} title={name}>
            <Icon name={icon} />
          </SiteLink>
        ))}
      </nav>
    </footer>
  )
}
