import { usePreferences } from '../../locale/usePreferences'
import { useLocation, Link } from 'react-router-dom'
import { drinkSections, menuCategories } from '../../data/menu'
import Icon from '../ui/Icon'

export default function MenuNavigation({ expanded, onToggle, onSelect, variant }) {
  const { t } = usePreferences()
  const { pathname, search } = useLocation()
  const category = new URLSearchParams(search).get('category') || menuCategories[0].id
  const current = drinkSections.some(section => section.id === category) ? 'drinks' : category
  const listId = `categories-${variant}`

  return (
    <div className={`menu-disclosure menu-disclosure--${variant}`}>
      <button type="button" aria-expanded={expanded} aria-controls={listId} onClick={onToggle}>
        {t('Menu')} <Icon name="chevron" size={13} />
      </button>
      {expanded && (
        <ul id={listId} className="category-popup" aria-label={t('Menu categories')}>
          {menuCategories.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/menu?category=${id}`} aria-current={pathname === '/menu' && current === id ? 'page' : undefined} onClick={onSelect}>
                {t(name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

