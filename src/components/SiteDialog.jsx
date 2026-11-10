import { usePreferences } from '../locale/usePreferences'
import { useEffect, useRef } from 'react'
import Directory from './dialogs/Directory'
import Detail from './dialogs/Detail'
import { locations, socialLinks } from '../data/site'
import SiteLink from './ui/SiteLink'
import Icon from './ui/Icon'

export default function SiteDialog({ panel, openPanel, close }) {
  const { t } = usePreferences()
  const dialog = useRef(null)
  const network = socialLinks.find(item => item.icon === panel)
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
    const target = dialog.current.querySelector('input') || dialog.current.querySelector('.dialog-close')
    target.focus({ preventScroll: true })
    dialog.current.scrollTop = 0
  }, [panel])
  return <dialog className="site-dialog" ref={dialog} aria-labelledby="panel-title" onCancel={close} onClick={event => {
    if (event.target === event.currentTarget) {
      const box = dialog.current.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close()
    }
  }}>
    <button className="dialog-close icon-button" aria-label={t('Close dialog')} onClick={close}><Icon name="close" /></button>
    {network ? <>
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
