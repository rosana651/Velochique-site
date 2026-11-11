import { usePreferences } from '../../locale/usePreferences'
import { locations } from '../../data/site'
import Icon from '../ui/Icon'

export default function MenuNavigation({ expanded, onToggle, onSelect, variant }) {
  const { t } = usePreferences()
  const listId = `categories-${variant}`

  return (
    <div className={`menu-disclosure menu-disclosure--${variant}`}>
      <button type="button" aria-expanded={expanded} aria-controls={listId} onClick={onToggle}>
        {t('Menu')} <Icon name="chevron" size={13} />
      </button>
      {expanded && (
        <ul id={listId} className="category-popup" aria-label={t('Choose a café')}>
          {locations.map(({ id, name }) => (
            <li key={id}>
              <button className="w-full px-5 py-3 text-left font-display hover:bg-stone-100 focus-visible:bg-stone-100" onClick={() => onSelect('menu-' + id)}>
                {t(name)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

