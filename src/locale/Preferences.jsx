import { useEffect, useState } from 'react'
import { Preferences } from './usePreferences'
import portuguese from './pt.json'

function read(key) {
  try { return localStorage.getItem('velochique.' + key) } catch { return null }
}

function save(key, value) {
  try { localStorage.setItem('velochique.' + key, value) } catch { /* Storage can be disabled. */ }
}

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => read('language') === 'pt' ? 'pt' : 'en')
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'
    save('language', language)
  }, [language])
  const formatter = new Intl.NumberFormat(language === 'pt' ? 'pt-PT' : 'en-US', { style: 'currency', currency: 'EUR' })
  function money(euros) {
    return formatter.format(euros)
  }
  function t(source) {
    const translated = language === 'pt' ? portuguese[source] ?? source : source
    return translated.replace(/€(\d+(?:\.\d+)?)/g, (_, amount) => money(Number(amount)))
  }
  return <Preferences.Provider value={{ language, setLanguage, t, money }}>{children}</Preferences.Provider>
}

