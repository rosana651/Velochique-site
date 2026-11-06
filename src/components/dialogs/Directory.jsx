import { usePreferences } from '../../locale/usePreferences'
import { useState } from 'react'
import { locations, products, ridesUrl, stories } from '../../data/site'
import Eyebrow from '../ui/Eyebrow'
import Icon from '../ui/Icon'
import SiteLink from '../ui/SiteLink'

const entries = [
  ...locations.map(({ id, name }) => ({ id, title: name, label: 'Location' })),
  ...products.map(({ id, name }) => ({ id, title: name, label: 'Collection' })),
  ...Object.entries(stories).map(([id, story]) => ({ id, title: story.title, label: story.label })),
  { id: 'community', title: 'Social rides & events', label: 'Community', href: ridesUrl },
  { id: 'contact', title: 'Contact Velochique', label: 'Information', href: '#contact' },
]

export default function Directory({ catalogue, openPanel, close }) {
  const { t } = usePreferences()
  const [query, setQuery] = useState('')
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const results = entries.filter(item => catalogue ? item.label === 'Collection' : normalize(t(item.title) + ' ' + t(item.label)).includes(normalize(query.trim())))
  return <>
    <Eyebrow>Velochique</Eyebrow>
    <h2 id="panel-title">{t(catalogue ? 'The collection' : 'Search the site')}</h2>
    {!catalogue && <input type="search" aria-label={t('Search sections, locations and collection')} placeholder={t('Try coffee, Monchique or jerseys…')} value={query} onChange={e => setQuery(e.target.value)} />}
    <ul className="result-list">{results.map(item => <li key={item.id}>{item.href
      ? <SiteLink href={item.href} onClick={close}>{t(item.title)}<Icon name="arrow" /></SiteLink>
      : <button onClick={() => openPanel(item.id)}>{t(item.title)}<small>{t(item.label)}</small></button>}</li>)}</ul>
    {results.length === 0 && <p role="status">{t("No matches. Try a location, product or service.")}</p>}
  </>
}

