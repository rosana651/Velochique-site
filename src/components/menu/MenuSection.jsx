import { usePreferences } from '../../locale/usePreferences'
export default function MenuSection({ section }) {
  const { t } = usePreferences()
  const showPhotos = section.group !== 'Drinks'
  const illustrated = showPhotos ? section.items.filter(item => item.photo) : []
  const listed = showPhotos ? section.items.filter(item => !item.photo) : section.items
  const titleId = `category-${section.id}`

  return (
    <section className="menu-section" aria-labelledby={titleId}>
      <header className="menu-category-head">
        <h2 id={titleId}>{t(section.name)}</h2>
        {section.note && <p>{t(section.note)}</p>}
      </header>
      {illustrated.length > 0 && (
        <ul className="dish-grid">
          {illustrated.map(item => (
            <li className="dish-card" key={t(item.name)}>
              <div className="dish-photo">
                <img src={`${import.meta.env.BASE_URL}images/menu/dishes/${item.photo}.webp`} alt="" loading="lazy" />
              </div>
              <div className="dish-copy">
                <h3>{t(item.name)}</h3>
                {item.description && <p>{t(item.description)}</p>}
                <strong className="dish-price">{t(item.price)}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
      {listed.length > 0 && (
        <ul className="menu-rows">
          {listed.map(item => (
            <li key={t(item.name)}>
              <div>
                <h3>{t(item.name)}</h3>
                {item.description && <p>{t(item.description)}</p>}
              </div>
              <strong>{t(item.price)}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
