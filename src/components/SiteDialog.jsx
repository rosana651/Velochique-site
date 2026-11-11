import { usePreferences } from '../locale/usePreferences'
import { useEffect, useRef } from 'react'
import Directory from './dialogs/Directory'
import Detail from './dialogs/Detail'
import { locations, socialLinks } from '../data/site'
import SiteLink from './ui/SiteLink'
import Icon from './ui/Icon'
import MenuReader from './menu/MenuReader'

export default function SiteDialog({ panel, openPanel, close }) {
  const { t } = usePreferences()
  const dialog = useRef(null)
  const network = socialLinks.find(item => item.icon === panel)
  const menuLocation = locations.find(item => panel === 'menu-' + item.id)
  useEffect(() => {
    const element = dialog.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = overflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])
  useEffect(() => {
    const target = dialog.current.querySelector('input, .dialog-close, [data-menu-reader]')
    target.focus({ preventScroll: true })
    dialog.current.scrollTop = 0
  }, [panel])
  return <dialog className={menuLocation ? 'fixed inset-0 m-auto h-[94dvh] w-[min(98vw,540px)] max-w-none overflow-hidden rounded-2xl bg-white font-display text-black shadow-2xl backdrop:bg-black/80' : 'site-dialog'} ref={dialog} aria-labelledby="panel-title" onCancel={close} onClick={event => {
    if (event.target === event.currentTarget) {
      const box = dialog.current.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close()
    }
  }}>
    {!menuLocation && <button className="dialog-close icon-button" aria-label={t('Close dialog')} onClick={close}><Icon name="close" /></button>}
    {menuLocation ? <MenuReader key={panel} location={menuLocation} close={close} /> : panel === 'menu' ? <>
      <h2 id="panel-title">MENU</h2>
      <ul className="result-list">{locations.map(item => <li key={item.id}><button onClick={() => openPanel('menu-' + item.id)}>{item.name}<Icon name="arrow" /></button></li>)}</ul>
    </> : network ? <>
      <h2 id="panel-title">{network.name}</h2>
      <p>{t('Choose a café')}</p>
      <ul className="result-list">
        {locations.map(location => <li key={location.id}>
          <SiteLink href={network.profiles[location.id]} onClick={close}>{location.name}<Icon name="arrow" /></SiteLink>
        </li>)}
      </ul>
    </> : panel === 'search' || panel === 'catalogue'
      ? <Directory key={panel} catalogue={panel === 'catalogue'} openPanel={openPanel} close={close} />
      : <Detail panel={panel} close={close} />}
  </dialog>
}
