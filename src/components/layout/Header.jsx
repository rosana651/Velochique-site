import PreferenceControls from './PreferenceControls'
import { usePreferences } from '../../locale/usePreferences'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuNavigation from '../menu/MenuNavigation'
import Icon from '../ui/Icon'
import SiteLink from '../ui/SiteLink'
import { locations, navigation } from '../../data/site'

export default function Header({ openPanel }) {
  const { t } = usePreferences()
  const [menu, setMenu] = useState(null)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const homePrefix = pathname === '/' ? '' : '/'
  const header = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    function updateVisibility() {
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      const y = Math.max(0, Math.min(window.scrollY, maxY))
      if (y > 0 && Math.abs(y - lastY) < 6) return
      setHidden(y > 0 && y > lastY)
      lastY = y
    }
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  useEffect(() => {
    if (!menu) return
    function dismiss(event) {
      if (event.key === 'Escape') {
        setMenu(null)
        trigger.current?.focus()
      } else if (event.type === 'pointerdown' && !header.current.contains(event.target)) {
        setMenu(null)
      }
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', dismiss)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', dismiss)
    }
  }, [menu])

  function toggle(event, name) {
    trigger.current = event.currentTarget
    setMenu(menu === name ? null : name)
  }
  function show(id) {
    if (menu) trigger.current?.focus({ preventScroll: true })
    setMenu(null)
    openPanel(id)
  }
  function categories(variant) {
    return <MenuNavigation variant={variant} expanded={menu === variant} onToggle={e => toggle(e, variant)} onSelect={() => setMenu(null)} />
  }

  const links = navigation.map(({ label, href, panel }) => href
    ? <SiteLink key={t(label)} href={href.startsWith('#') ? homePrefix + href : href} onClick={() => setMenu(null)}>{t(label)}</SiteLink>
    : <button key={t(label)} onClick={() => show(panel)}>{t(label)}</button>)

  return (
    <header ref={header} className="site-header" data-hidden={hidden && !menu}>
      <SiteLink className="wordmark" href={homePrefix + '#top'} aria-label={t('Velochique home')}>Velochique</SiteLink>
      <nav className="desktop-nav" aria-label={t('Primary')}>
        <div className="relative">
          <button className="flex items-center gap-1" aria-expanded={menu === 'locations'} onClick={e => toggle(e, 'locations')}>{t("Locations")} <Icon name="chevron" size={12} /></button>
          {menu === 'locations' && <div className="location-menu">{locations.map(item => <button key={item.id} onClick={() => show(item.id)}>{t(item.name)}</button>)}</div>}
        </div>
        {categories('desktop')}
        {links}
        <PreferenceControls />
      </nav>
      {categories('compact')}
      <button className="icon-button mobile-toggle" aria-label={t('Toggle navigation')} aria-expanded={menu === 'mobile'} onClick={e => toggle(e, 'mobile')}><Icon name={menu === 'mobile' ? 'close' : 'menu'} /></button>
      {menu === 'mobile' && <nav className="mobile-nav" aria-label={t('Mobile')}><SiteLink href={homePrefix + '#locations'} onClick={() => setMenu(null)}>{t("Locations")}</SiteLink>{links}<PreferenceControls /></nav>}
    </header>
  )
}


