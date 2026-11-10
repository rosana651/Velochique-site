import { usePreferences } from '../../locale/usePreferences'
import { locations, products, stories } from '../../data/site'
import StockStatus from '../shop/StockStatus'
import Action from '../ui/Action'
import Eyebrow from '../ui/Eyebrow'
import Icon from '../ui/Icon'
import SiteLink from '../ui/SiteLink'

export default function Detail({ panel, close }) {
  const { t, language } = usePreferences()
  const mapView = panel.startsWith('map-')
  const location = locations.find(item => item.id === (mapView ? panel.slice(4) : panel))
  const product = products.find(item => item.id === panel)
  const story = stories[panel]
  let content = story
  if (location) {
    const query = encodeURIComponent('Velochique ' + location.name + ', ' + location.address + ', Portugal')
    if (mapView) return <>
      <h2 id="panel-title">{location.name}</h2>
      <p>{location.address}</p>
      <iframe className="location-map" title={`Google Maps · ${location.name}`} src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      <SiteLink className="underline" href={'https://www.google.com/maps/search/?api=1&query=' + query}>{t("Open in Google Maps ↗")}</SiteLink>
    </>
    content = { label: 'Our locations', title: location.name, text: location.detail, action: 'Get directions', href: 'https://www.google.com/maps/search/?api=1&query=' + query }
  } else if (product) {
    content = { label: 'Velochique collection', title: product.name[language], text: product.description[language] }
  }
  return <>
    {(location || product) && <img className={product ? 'dialog-product' : 'dialog-photo'} src={import.meta.env.BASE_URL + (product ? product.images[0] : `images/${panel}.webp`)} alt="" />}
    <Eyebrow>{t(content.label)}</Eyebrow>
    <h2 id="panel-title">{t(content.title)}</h2>
    <p>{t(content.text)}</p>
    {location && <p className="flex items-center gap-2"><Icon name="pin" />{location.address}</p>}
    {product ? <StockStatus product={product} /> : <Action href={content.href} onClick={content.href.startsWith('/#') ? close : undefined}>{t(content.action)}</Action>}
  </>
}

