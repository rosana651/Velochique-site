const hoodieColors = [
  { en: 'Black', pt: 'Preto', photos: ['8391', '8596'] },
  { en: 'Taupe', pt: 'Taupe', photos: ['8353'] },
  { en: 'Cream', pt: 'Creme', photos: ['8629', '8408'] },
  { en: 'Pink', pt: 'Rosa', photos: ['8587', '8588'] },
  { en: 'Light green', pt: 'Verde-claro', photos: ['8612'] },
  { en: 'Light blue', pt: 'Azul-claro', photos: ['8634'] },
].map(({ photos, ...name }) => ({
  ...name,
  images: photos.map(photo => `images/monchique-hoodie/${photo}.jpg`),
}))

const bottlePhoto = id => `images/velochique-bottles/${id}.jpg`
const bottleVolumes = [
  { ml: 750, price: 10, images: ['8359', '8410', '8581'].map(bottlePhoto) },
  { ml: 500, price: 8, images: ['8572', '8623'].map(bottlePhoto) },
]

const catalogue = [
  {
    id: 'velochique-t-shirt',
    status: 'published',
    price: 20,
    inStock: false,
    name: { en: 'Velochique T-shirt', pt: 'T-shirt Velochique' },
    description: {
      en: 'Black T-shirt with the Velochique logo on the chest and “Ciclismo + Café + Comida” on the back.',
      pt: 'T-shirt preta com o logótipo Velochique no peito e «Ciclismo + Café + Comida» nas costas.',
    },
    images: ['images/velochique-shirt-front.jpg', 'images/velochique-shirt-back.jpg'],
    sizes: [],
    colors: [{ en: 'Black', pt: 'Preto' }],
  },
  {
    id: 'monchique-hoodie',
    status: 'published',
    price: 59,
    inStock: false,
    name: { en: 'Monchique Hoodie', pt: 'Sweatshirt Monchique com capuz' },
    description: {
      en: 'Pullover hoodie with a front pocket and a multicoloured Monchique mountain print.',
      pt: 'Sweatshirt com capuz, bolso frontal e estampado multicolorido da serra de Monchique.',
    },
    images: hoodieColors.flatMap(color => color.images),
    colors: hoodieColors,
    sizes: [],
  },
  {
    id: 'velochique-polo',
    status: 'published',
    price: 20,
    inStock: false,
    name: { en: 'Velochique Polo', pt: 'Polo Velochique' },
    description: {
      en: 'Black short-sleeved polo with a button placket, the Velochique logo on the chest and “Ciclismo + Café + Comida” on the back.',
      pt: 'Polo preto de manga curta com gola e botões, o logótipo Velochique no peito e «Ciclismo + Café + Comida» nas costas.',
    },
    images: ['images/velochique-polo-front.jpg', 'images/velochique-polo-back.jpg'],
    colors: [{ en: 'Black', pt: 'Preto' }],
    sizes: [],
  },
  {
    id: 'velochique-tote-bag',
    status: 'published',
    price: 0,
    inStock: false,
    name: { en: 'Velochique Tote Bag', pt: 'Saco Velochique' },
    description: {
      en: 'Black tote bag with long handles and a white “Ride. Sip. Repeat.” print.',
      pt: 'Saco preto de alças compridas com a inscrição «Ride. Sip. Repeat.» em branco.',
    },
    images: ['images/velochique-tote-wall.jpg', 'images/velochique-tote-bike.jpg'],
    colors: [{ en: 'Black', pt: 'Preto' }],
    sizes: [],
  },
  {
    id: 'velochique-bottles',
    status: 'published',
    inStock: false,
    name: { en: 'Velochique Cycling Bottle', pt: 'Bidão de ciclismo Velochique' },
    description: {
      en: 'Cycling bottle with the Velochique logo and a sports cap.',
      pt: 'Bidão de ciclismo com o logótipo Velochique e tampa desportiva.',
    },
    volumes: bottleVolumes,
    images: [...['8563', '8368'].map(bottlePhoto), ...bottleVolumes.flatMap(volume => volume.images)],
  },
]

export const products = catalogue.filter(product => product.status === 'published')
