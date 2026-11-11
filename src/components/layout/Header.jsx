import PreferenceControls from './PreferenceControls'
import BrandLogo from '../ui/BrandLogo'
import { usePreferences } from '../../locale/usePreferences'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const mobileOpen = menu === 'mobile' || menu === 'mobile-contact'

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
        if (menu === 'mobile-contact') {
          setMenu('mobile')
          trigger.current?.focus()
          return
        }
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
    return <MenuNavigation variant={variant} expanded={menu === variant} onToggle={e => toggle(e, variant)} onSelect={show} />
  }

  function contactLinks(mobile = false) {
    const id = mobile ? 'mobile-contact' : 'desktop-contact'
    const expanded = menu === id
    return <div className="relative">
      <button className="flex items-center gap-1" aria-expanded={expanded} onClick={event => {
        trigger.current = event.currentTarget
        setMenu(expanded ? (mobile ? 'mobile' : null) : id)
      }}>{t('Contact us')} <Icon name="chevron" size={12} /></button>
      {expanded && <div className="location-menu contact-menu">
        {locations.map(location => <Link key={location.id} to={`/contact/?location=${location.id}`} onClick={() => setMenu(null)}>{location.name}</Link>)}
      </div>}
    </div>
  }

  const links = navigation.map(({ label, href, panel }) => href
    ? <SiteLink key={t(label)} href={href.startsWith('#') ? homePrefix + href : href} onClick={() => setMenu(null)}>{t(label)}</SiteLink>
    : <button key={t(label)} onClick={() => show(panel)}>{t(label)}</button>)

  return (
    <header ref={header} className="site-header" data-hidden={hidden && !menu}>
      <SiteLink className="shrink-0 py-1" href={homePrefix + '#top'} aria-label={t('Velochique home')}><BrandLogo /></SiteLink>
      <nav className="desktop-nav self-end mb-4" aria-label={t('Primary')}>
        <div className="relative">
          <button className="flex items-center gap-1" aria-expanded={menu === 'locations'} onClick={e => toggle(e, 'locations')}>{t("Locations")} <Icon name="chevron" size={12} /></button>
          {menu === 'locations' && <div className="location-menu">{locations.map(item => <button key={item.id} onClick={() => show(item.id)}>{t(item.name)}</button>)}</div>}
        </div>
        {categories('desktop')}
        {links}
        {contactLinks()}
        <PreferenceControls />
      </nav>
      {categories('compact')}
      <button className="icon-button mobile-toggle" aria-label={t('Toggle navigation')} aria-expanded={mobileOpen} onClick={e => mobileOpen ? setMenu(null) : toggle(e, 'mobile')}><Icon name={mobileOpen ? 'close' : 'menu'} /></button>
      {mobileOpen && <nav className="mobile-nav" aria-label={t('Mobile')}><SiteLink href={homePrefix + '#locations'} onClick={() => setMenu(null)}>{t("Locations")}</SiteLink>{links}{contactLinks(true)}<PreferenceControls /></nav>}
    </header>
  )
}


