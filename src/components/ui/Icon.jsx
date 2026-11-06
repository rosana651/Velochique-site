const shapes = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  facebook: <path fill="currentColor" stroke="none" d="M14.2 22v-9h3l.45-3.5H14.2V7.3c0-1 .28-1.7 1.74-1.7h1.86V2.47c-.32-.04-1.43-.14-2.72-.14-2.7 0-4.55 1.65-4.55 4.68V9.5H7.48V13h3.05v9z" />,
  tiktok: <path fill="currentColor" stroke="none" d="M13.1 2h3.3a5.3 5.3 0 0 0 5.1 5.1v3.3a8.8 8.8 0 0 1-5.1-1.7v7.2a6.5 6.5 0 1 1-6.5-6.5l.9.06v3.4a3.2 3.2 0 1 0 2.3 3.05z" />,
  arrow: <path d="M3 12h17m-6-6 6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  search: <><circle cx="10.5" cy="10.5" r="7.5" /><path d="m16 16 5 5" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  bike: <><circle cx="5" cy="16" r="4" /><circle cx="19" cy="16" r="4" /><path d="m5 16 5-9 4 9H5l7-7h5m2 7-4-12h-3M8 6h4" /></>,
  cup: <><path d="M3 9h14v4a7 7 0 0 1-14 0zm14 1h2a3 3 0 0 1 0 6h-3M1 21h20M7 6c-2-2 2-2 0-5m5 5c-2-2 2-2 0-5" /></>,
  mountain: <path d="m1 19 8-10 3 3 4-7 7 14M6 13l3 1 2-2m3-4 2 2 1-2" />,
  wrench: <path d="M21 3a6 6 0 0 1-7.3 7.7L5 20a2 2 0 0 1-3-3l9.4-8.7A6 6 0 0 1 19 1l-4 4 3 2z" />,
  pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  mail: <path d="M2 5h20v14H2zM2 6l10 8L22 6" />,
}

export default function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>
}
