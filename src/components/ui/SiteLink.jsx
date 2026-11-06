export default function SiteLink({ href, ...props }) {
  const destination = href.startsWith('/') && !href.startsWith('//') ? import.meta.env.BASE_URL + href.slice(1) : href
  const url = new URL(href, document.baseURI)
  const external = ['http:', 'https:'].includes(url.protocol) && url.origin !== window.location.origin

  return <a {...props} href={destination} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} />
}
