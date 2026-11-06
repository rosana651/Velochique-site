import Icon from './Icon'
import SiteLink from './SiteLink'

export default function Action({ children, href, onClick, tone = 'dark', bike = false }) {
  const Tag = href ? SiteLink : 'button'
  return (
    <Tag href={href} onClick={onClick} className={`action action--${tone}`}>
      {bike && <Icon name="bike" />} {children} <Icon name="arrow" size={17} />
    </Tag>
  )
}
