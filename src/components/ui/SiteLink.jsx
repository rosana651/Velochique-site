export default function SiteLink({ href, ...props }) {
  const url = new URL(href, document.baseURI)
  const external = ['http:', 'https:'].includes(url.protocol) && url.origin !== window.location.origin

  return <a {...props} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} />
}
