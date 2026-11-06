import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function usePageMotion(scope) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', { opacity: 0, y: 12, duration: 0.55, stagger: 0.07, ease: 'power2.out', clearProps: 'transform,opacity' })
      for (const selector of ['.locations', '.product-rail']) {
        const group = scope.current.querySelector(selector)
        gsap.from(group.children, {
          y: 14, duration: 0.6, stagger: 0.06, ease: 'power2.out', clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 94%', once: true },
        })
      }
    }, scope)
    return () => media.revert()
  }, [scope])
}
