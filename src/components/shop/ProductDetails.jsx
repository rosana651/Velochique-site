import { usePreferences } from '../../locale/usePreferences'
import StockStatus from './StockStatus'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

export default function ProductDetails({ product }) {
  const { language, money, t } = usePreferences()
  const gallery = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [bottleChoice, setBottleChoice] = useState({ volume: product.volumes?.[0], color: null })
  const selectedColor = product.colors?.find(color => color.images?.includes(product.images[slideIndex]))
  const volume = bottleChoice.volume ?? product.volumes?.[0]
  const price = volume?.price ?? product.price

  function chooseBottle(option, color) {
    setBottleChoice({ volume: option, color })
    const photo = color ? option.images.find(image => color.images.includes(image)) : option.images[0]
    showPhoto(photo ?? product.images[0])
  }

  function updateSlide(swiper) {
    const index = swiper.activeIndex
    setSlideIndex(index)
    const image = product.images[index]
    const option = product.volumes?.find(item => item.images.includes(image))
    if (option) setBottleChoice({ volume: option, color: product.colors.find(item => item.images.includes(image)) })
  }

  function showPhoto(image) {
    const swiper = gallery.current
    if (!swiper) return
    if (swiper.zoom.scale > 1) swiper.zoom.out()
    swiper.slideTo(product.images.indexOf(image))
  }
  return <article className="grid gap-7 md:grid-cols-2 md:items-start md:gap-16">
    <div className="relative min-w-0">
    <Swiper key={product.id} modules={[Navigation, A11y, Zoom]} navigation={product.images.length > 1}
      zoom={{ maxRatio: 3 }} onSwiper={swiper => { gallery.current = swiper }}
      onSlideChange={updateSlide}
      a11y={{ prevSlideMessage: t('Previous photo'), nextSlideMessage: t('Next photo') }}
      className="w-full min-w-0 rounded-sm bg-[#eeeae5] [--swiper-theme-color:#191a18] [--swiper-navigation-size:24px]">
      {product.images.map((image, index) => <SwiperSlide key={image}>
        <div className="swiper-zoom-container" style={{ height: 'min(68dvh, 720px)' }}>
          <img src={import.meta.env.BASE_URL + image} loading={index === 0 ? 'eager' : 'lazy'} className="h-full w-full object-contain"
            alt={product.name[language] + ' · ' + (index + 1)} />
        </div>
      </SwiperSlide>)}
    </Swiper>
    </div>
    <div className="md:pt-6">
      <h1 className="font-display text-3xl font-semibold tracking-wide md:text-5xl">{product.name[language]}</h1>
      {price != null && <p className="mt-4 text-2xl tabular-nums">{money(price)}</p>}
      <StockStatus product={product} />
      <p className="my-6 max-w-prose border-t border-[#c6c3ba] pt-6">{product.description[language]}</p>
      {volume && <fieldset className="mb-4">
        <legend className="mb-3 font-semibold">{t('Capacity')}</legend>
        <div className="flex flex-wrap gap-2">
          {product.volumes.map(option => <button key={option.ml} type="button"
            aria-pressed={volume === option} onClick={() => chooseBottle(option, bottleChoice.color)}
            className="min-h-11 rounded-sm border border-[#bcb9b0] px-3 aria-pressed:border-black aria-pressed:bg-black aria-pressed:text-white">
            {option.ml} ml · {money(option.price)}
          </button>)}
        </div>
      </fieldset>}
      {product.sizes?.length > 0 && <p className="mb-4"><strong>{t('Sizes')}</strong> · {product.sizes.join(' / ')}</p>}
      {product.volumes ? <fieldset className="mb-4">
        <legend className="mb-3 font-semibold">{t('Colours')}</legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map(color => <button key={color.en} type="button"
            aria-pressed={bottleChoice.color === color} onClick={() => chooseBottle(volume, color)}
            className="min-h-11 rounded-sm border border-[#bcb9b0] px-3 aria-pressed:border-black aria-pressed:bg-black aria-pressed:text-white">
            {color[language]}
          </button>)}
        </div>
      </fieldset> : product.colors?.[0]?.images ? <fieldset className="mb-4">
        <legend className="mb-3"><strong>{t('Colours')}</strong>{selectedColor && ' · ' + selectedColor[language]}</legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map(color => <button key={color.images[0]} type="button"
            className="size-16 overflow-hidden rounded-sm border-2 border-transparent bg-[#eeeae5] p-0.5 hover:border-[#a9a69e] aria-pressed:border-[#191a18] sm:size-20"
            aria-label={color[language]} title={color[language]} aria-pressed={color === selectedColor}
            onClick={() => showPhoto(color.images[0])}>
            <img className="size-full rounded-[1px] object-cover object-[center_68%]" src={import.meta.env.BASE_URL + color.images[0]} alt="" />
          </button>)}
        </div>
      </fieldset> : product.colors?.length > 0 && <p className="mb-4"><strong>{t('Colours')}</strong> · {product.colors.map(color => color[language]).join(' / ')}</p>}
    </div>
  </article>
}
