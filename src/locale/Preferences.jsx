import { useEffect, useState } from 'react'
import { Preferences } from './usePreferences'
import portuguese from './pt.json'

const fallbackRate = 1.0389 // ECB reference rate, 31 December 2024.

function read(key) {
  try { return localStorage.getItem('velochique.' + key) } catch { return null }
}

function save(key, value) {
  try { localStorage.setItem('velochique.' + key, value) } catch { /* Storage can be disabled. */ }
}

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => read('language') === 'pt' ? 'pt' : 'en')
  const [currency, setCurrency] = useState(() => read('currency') === 'USD' ? 'USD' : 'EUR')
  const [rate, setRate] = useState(() => {
    const saved = Number(read('usdRate'))
    return Number.isFinite(saved) && saved > 0 ? saved : fallbackRate
  })
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'
    save('language', language)
  }, [language])
  useEffect(() => {
    save('currency', currency)
    if (currency !== 'USD') return
    const controller = new AbortController()
    async function refresh() {
      try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD', { signal: controller.signal })
        if (!response.ok) return
        const data = await response.json()
        const value = data.rates?.USD
        if (data.base === 'EUR' && Number.isFinite(value) && value > 0) {
          setRate(value)
          save('usdRate', value)
        }
      } catch { /* Keep the stored reference rate when offline. */ }
    }
    refresh()
    return () => controller.abort()
  }, [currency])

  const formatter = new Intl.NumberFormat(language === 'pt' ? 'pt-PT' : 'en-US', { style: 'currency', currency })
  function money(euros) {
    return formatter.format(currency === 'USD' ? euros * rate : euros)
  }
  function t(source) {
    const translated = language === 'pt' ? portuguese[source] ?? source : source
    return translated.replace(/€(\d+(?:\.\d+)?)/g, (_, amount) => money(Number(amount)))
  }
  return <Preferences.Provider value={{ language, setLanguage, currency, setCurrency, t, money }}>{children}</Preferences.Provider>
}

