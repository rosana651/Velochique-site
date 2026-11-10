import { usePreferences } from '../../locale/usePreferences'
import { locations, socialLinks } from '../../data/site'
import Icon from '../ui/Icon'
import BrandLogo from '../ui/BrandLogo'

export default function Footer({ openPanel }) {
  const { t } = usePreferences()
  return (
    <footer id="contact" className="footer-bar">
      <a className="[grid-area:brand] justify-self-start" href="#top"><BrandLogo footer /></a>
      <div className="footer-locations">
        {locations.map(location => (
          <button key={location.id} aria-haspopup="dialog" onClick={() => openPanel('map-' + location.id)}>
            <strong>{location.name}</strong>
            <small>{location.address}</small>
          </button>
        ))}
      </div>
      <nav className="footer-socials" aria-label={t('Social media')}>
        {socialLinks.map(({ name, icon }) => (
          <button key={name} type="button" className="grid size-11 place-items-center rounded-full hover:bg-[#363732] focus-visible:bg-[#363732]" onClick={() => openPanel(icon)} aria-haspopup="dialog" aria-label={name} title={name}>
            <Icon name={icon} />
          </button>
        ))}
      </nav>
    </footer>
  )
}
