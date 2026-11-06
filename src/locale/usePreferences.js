import { createContext, useContext } from 'react'

export const Preferences = createContext(null)

export function usePreferences() {
  return useContext(Preferences)
}
