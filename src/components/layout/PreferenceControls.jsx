import { usePreferences } from '../../locale/usePreferences'

export default function PreferenceControls() {
  const { language, setLanguage, t } = usePreferences()
  return (
    <div className="preference-controls">
      <label>
        <span className="sr-only">{t('Language')}</span>
        <select value={language} onChange={event => setLanguage(event.target.value)}>
          <option value="en" lang="en">English</option>
          <option value="pt" lang="pt">Português</option>
        </select>
      </label>
    </div>
  )
}
