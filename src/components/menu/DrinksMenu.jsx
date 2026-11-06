import { usePreferences } from '../../locale/usePreferences'
import { Link } from 'react-router-dom'
import { drinkSections } from '../../data/menu'
import MenuSection from './MenuSection'

export default function DrinksMenu({ selected }) {
  const { t } = usePreferences()
  const active = drinkSections.find(section => section.id === selected)
  const visible = active ? [active] : drinkSections

  return <>
    <nav className="drinks-filters" aria-label={t('Filter drinks by type')}>
      <Link to="?category=drinks" aria-current={!active ? 'page' : undefined}>{t("All drinks")}</Link>
      {drinkSections.map(({ id, name }) => (
        <Link key={id} to={`?category=drinks&type=${id}`} aria-current={active?.id === id ? 'page' : undefined}>
          {t(name)}
        </Link>
      ))}
    </nav>
    {visible.map(section => <MenuSection key={section.id} section={section} />)}
  </>
}
