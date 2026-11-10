export default function BrandLogo({ footer = false }) {
  const assets = import.meta.env.BASE_URL + 'images/'
  return (
    <picture className="block">
      <source media="(max-width: 760px)" srcSet={assets + 'velochique-bike.png'} />
      <img src={assets + 'velochique-logo.png'} alt="Velochique"
        className={footer
          ? 'block h-24 w-auto brightness-0 invert max-[760px]:h-10'
          : 'block h-20 w-auto max-[760px]:h-9 min-[981px]:h-[clamp(120px,10vw,160px)]'} />
    </picture>
  )
}
