const hoodieColors = [
  { en: 'Cherry pollen', pt: 'Rosa-cereja', photos: ['cherry-pollen', 'cherry-pollen-alt', 'cherry-pollen-flat'] },
  { en: 'Wine red', pt: 'Bordô', photos: ['wine-red'] },
  { en: 'Milk yellow', pt: 'Amarelo-creme', photos: ['milk-yellow', 'milk-yellow-flat'] },
  { en: 'Light green', pt: 'Verde-claro', photos: ['light-green'] },
  { en: 'Dark Grey', pt: 'Cinzento-escuro', photos: ['dark-grey', 'dark-grey-alt'] },
  { en: 'Tibetan Blue', pt: 'Azul tibetano', photos: ['tibetan-blue'] },
  { en: 'Haze Blue', pt: 'Azul-neblina', photos: ['haze-blue'] },
].map(({ photos, ...name }) => ({
  ...name,
  images: photos.map(photo => `images/monchique-hoodie/${photo}.jpg`),
}))

const portimaoPhoto = name => `images/portimao-hoodie/${name}.jpg`
const portimaoColors = [
  { en: 'Black', pt: 'Preto', images: ['black', 'black-alt'].map(portimaoPhoto) },
  { en: 'Navy', pt: 'Azul-marinho', images: ['navy', 'navy-alt'].map(portimaoPhoto) },
  { en: 'Grey', pt: 'Cinzento', images: [portimaoPhoto('grey')] },
  { en: 'Cream', pt: 'Creme', images: [portimaoPhoto('cream')] },
]

const bottlePhoto = id => `images/velochique-bottles/${id}.jpg`
const bottleColors = [
  { en: 'Transparent', pt: 'Transparente', images: ['8410', '8623'].map(bottlePhoto) },
  { en: 'Black', pt: 'Preto', images: ['8359', '8572'].map(bottlePhoto) },
  { en: 'Orange', pt: 'Laranja', images: ['8581'].map(bottlePhoto) },
]
const bottleVolumes = [
  { ml: 750, price: 10, images: ['8359', '8410', '8581'].map(bottlePhoto) },
  { ml: 550, price: 8, images: ['8572', '8623'].map(bottlePhoto) },
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
    homeCover: 'images/monchique-hoodie/8391.jpg',
    status: 'published',
    price: 59,
    inStock: false,
    name: { en: 'Monchique Hoodie', pt: 'Sweatshirt Monchique com capuz' },
    availability: {
      en: 'Only in Monchique. Currently out of stock.',
      pt: 'Apenas em Monchique. De momento sem stock.',
    },
    description: {
      en: 'Pullover hoodie with a front pocket and a multicoloured Monchique mountain print.',
      pt: 'Sweatshirt com capuz, bolso frontal e estampado multicolorido da serra de Monchique.',
    },
    images: [...hoodieColors.flatMap(color => color.images), 'images/monchique-hoodie/palette.jpg'],
    colors: hoodieColors,
    sizes: [],
  },
  {
    id: 'portimao-hoodie',
    status: 'published',
    inStock: false,
    name: { en: 'Portimão Hoodie', pt: 'Sweatshirt Portimão com capuz' },
    availability: {
      en: 'Coming in January 2027, only at Vista Rio in Portimão.',
      pt: 'Disponível a partir de janeiro de 2027, apenas no Vista Rio em Portimão.',
    },
    description: {
      en: 'Pullover hoodie with a front pocket and a Portimão sunset print.',
      pt: 'Sweatshirt com capuz, bolso frontal e estampado de um pôr do sol em Portimão.',
    },
    images: portimaoColors.flatMap(color => color.images),
    colors: portimaoColors,
  },
  {
    id: 'velochique-polo',
    status: 'published',
    price: 27.50,
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
    price: 12.50,
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
      en: 'All bottles are 100% recyclable, and BPA and PET free',
      pt: 'Todos os bidões são 100% recicláveis e não contêm BPA nem PET.',
    },
    volumes: bottleVolumes,
    colors: bottleColors,
    images: [...['8563', '8368'].map(bottlePhoto), ...bottleVolumes.flatMap(volume => volume.images)],
  },
]

export const products = catalogue.filter(product => product.status === 'published')
