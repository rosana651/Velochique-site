import { useState } from 'react'
import { usePreferences } from '../../locale/usePreferences'
import Icon from '../ui/Icon'

const menus = {
  monchique: { count: 24, width: 541, height: 961, format: 'png' },
  portimao: { count: 20, width: 1125, height: 2000, format: 'jpg' },
}

export default function MenuReader({ location, close }) {
  const { language, t } = usePreferences()
  const [page, setPage] = useState(1)
  const { count, width, height, format } = menus[location.id]
  const pt = language === 'pt'

  function updatePage({ currentTarget: reader }) {
    const middle = reader.getBoundingClientRect().top + reader.clientHeight / 2
    const index = Array.from(reader.children).findIndex(image => image.getBoundingClientRect().bottom > middle)
    setPage(index === -1 ? count : index + 1)
  }

  return <div className="flex h-full flex-col">
    <h2 id="panel-title" className="grid w-full shrink-0 place-items-center py-3 text-xl font-semibold">
      MENU<span className="sr-only"> · {location.name}</span>
    </h2>
    <div data-menu-reader tabIndex={0} role="region" aria-labelledby="panel-title"
      onScroll={updatePage} className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-stone-100 focus-visible:-outline-offset-4">
      {Array.from({ length: count }, (_, i) => <img key={i}
        className="block h-auto w-full" width={width} height={height}
        loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
        src={`${import.meta.env.BASE_URL}menus/${location.id}/${i + 1}.${format}`}
        alt={`${location.name} · ${pt ? 'Página' : 'Page'} ${i + 1}`} />)}
    </div>
    <div className="relative grid h-12 shrink-0 place-items-center bg-white">
      <span className="text-sm font-semibold tabular-nums">{page} {pt ? 'de' : 'of'} {count}</span>
      <button className="absolute right-1 grid size-11 place-items-center rounded-full hover:bg-stone-100"
        aria-label={t('Close dialog')} onClick={close}><Icon name="close" /></button>
    </div>
  </div>
}
