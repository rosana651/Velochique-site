import { usePreferences } from '../locale/usePreferences'
import { useEffect, useRef } from 'react'
import Directory from './dialogs/Directory'
import Detail from './dialogs/Detail'
import Icon from './ui/Icon'

export default function SiteDialog({ panel, openPanel, close }) {
  const { t } = usePreferences()
  const dialog = useRef(null)
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
    {panel === 'search' || panel === 'catalogue'
      ? <Directory key={panel} catalogue={panel === 'catalogue'} openPanel={openPanel} close={close} />
      : <Detail panel={panel} close={close} />}
  </dialog>
}
