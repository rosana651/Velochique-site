import { mkdir, copyFile } from 'node:fs/promises'

// Static entry points allow direct visits and refreshes on GitHub Pages.
for (const route of ['menu', 'shop']) {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}
