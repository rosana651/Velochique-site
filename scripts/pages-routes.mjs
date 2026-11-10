import { mkdir, copyFile } from 'node:fs/promises'
import { products } from '../src/data/products.js'

// Static entry points allow direct visits and refreshes on GitHub Pages.
for (const route of ['menu', 'shop', 'contact', ...products.map(product => `shop/${product.id}`)]) {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}
