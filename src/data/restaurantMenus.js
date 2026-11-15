import { menuSections } from './menu'

// Transcribed from public/menus/{monchique,portimao}. Images are intentionally unset.
const section = id => menuSections.find(entry => entry.id === id)
const dish = (name, changes = {}) => ({ ...menuSections.flatMap(entry => entry.items).find(entry => entry.name === name), ...changes })
const item = (name, price, description) => ({ name, price, description })
const group = (id, name, items, note) => ({ id, name, items, note })

const portimao = [
  group('brunch', 'All day brunch', [
    dish('Eggs Benedict'), dish('Mushroom omelette'), dish('Ham & cheese omelette'),
    item('Bacon pancakes with maple syrup', '€9.00', 'Buttermilk pancakes, crispy bacon, butter and real maple syrup. Add a fried egg €2.'),
    dish('Oat & banana pancakes'),
    item('Pistachio & mixed berry pancakes', '€10.00', 'Buttermilk pancakes with pistachio cream, mixed berries and chopped pistachios.'),
    dish('Avocado toast with eggs'),
    item('Granola bowl', '€7.50', 'Yoghurt, granola, kiwi, banana, blueberries, raspberries, goji berries, coconut and chia seeds.'),
    dish('Açaí bowl', { price: '€12.00' }),
    item('Scrambled eggs on homemade bread', '€7.00', 'Scrambled eggs on thick-cut toast. Add bacon €2.50, avocado €2.50, salmon €4 or mushrooms €2.'),
    dish('Ham & cheese toast'), dish('Chicken ciabatta', { price: '€10.00' }),
    item('Burrito', '€9.50', 'Scrambled eggs, bacon, crispy potatoes, cheese, tomato, red onion, avocado and cucumber with vinaigrette and sweet chilli mayo in a wheat tortilla.'),
    dish('Vegan burrito', { description: 'Tofu, spinach, tomato, red onion, avocado and cucumber with vinaigrette and vegan sweet chilli mayo in a wheat tortilla.' }),
    dish('Salmon bagel'),
  ], '8:30am – 3:30pm'),
  group('burgers-sandwiches', 'Burgers & sandwiches', [
    dish('Black bean & mushroom burger', { price: '€11.50', description: 'Cheddar, iceberg lettuce, tomato, caramelised onions and burger sauce on a seeded bagel. Vegan option available.' }),
    item('Hot honey & crispy chicken sandwich', '€12.50', 'Breaded chicken thigh, coleslaw, pickles and house hot honey in a burger bun.'),
    dish('Pulled pork bun', { price: '€11.50' }),
  ]),
  group('velo-bowls-baos', 'Velo bowls & baos', [dish('Velo baos'), dish('Velo bowl', { price: '€12.50' })]),
  group('salads-soups', 'Salads & soups', [dish('Chicken Caesar salad'), dish('Tomato, basil & feta soup', { description: 'Tomato, bell pepper, onion, fresh basil and feta. Add bread or toast €2.' }), dish('Carrot & ginger soup', { price: '€5.00', description: 'Carrot, ginger and coconut milk. Add bread or toast €2.' })]),
  group('kids-menu', 'Kids menu', [dish('Chicken nuggets', { description: 'Breaded chicken pieces, potato wedges and ketchup. Includes water, apple juice or orange juice.' }), item('Granola bowl', '€6.00', 'Greek yoghurt, crunchy granola, strawberries, raspberries, grapes, banana and blueberries.')], 'Under 12'),
  group('extras-fries-dips', 'Extras, fries & dips', section('extras-fries-dips').items.filter(entry => !['Bread / toast', 'Bacon', 'Eggs'].includes(entry.name)).map(entry => entry.name === 'Grilled tofu' ? { ...entry, name: 'Sautéed tofu', price: '€3.50' } : entry.name === 'Dips' ? { ...entry, price: '€1.50' } : entry)),
  group('coffee', 'Coffee', [
    dish('Espresso • single / double', { price: '€1.00 / €2.00' }),
    dish('Americano / iced Americano', { price: '€2.40' }), item('Cortado', '€2.40'), item('Piccolo', '€2.40'),
    dish('Flat white'), dish('Cappuccino', { price: '€3.20' }), dish('Latte / latte macchiato / iced latte', { price: '€3.20' }),
    dish('Cold brew'), item('Batch brew', '€3.50'), dish('Chai latte'), dish('Turmeric latte'), dish('English breakfast tea'),
    dish('Oat or coconut milk'), dish('Extra espresso shot', { price: '€0.70' }), dish('Extra milk'), dish('Flavoured syrup'), dish('Specialty coffee beans', { description: '200g bag.' }),
  ]),
  section('specialty-tea'),
  group('signature-drinks-matcha', 'Signature drinks & matcha', [dish('Matcha latte'), item('Iced matcha latte', '€3.90'), dish('Iced pistachio matcha'), dish('Iced strawberry or mango matcha'), item('Homemade iced tea', '€3.50', 'Hibiscus, cherry or passion fruit & mango.'), dish('House hot chocolate'), dish('Biscoff latte'), dish('Mont Blanc cold brew')]),
  { ...section('smoothies-milkshakes'), items: section('smoothies-milkshakes').items.map(entry => entry.name === 'Berry Nutty Bliss' ? { ...entry, name: 'Açaí Bliss' } : entry.name === 'Green Fusion' ? { ...entry, description: 'Pineapple, banana, broccoli, celery, spinach and mango.' } : entry) },
  group('cocktails-sangria', 'Cocktails & sangria', [dish('Classic mojito', { price: '€6.50' }), dish('Aperol spritz', { price: '€7.00' }), dish('Gin & tonic', { description: 'Gordon’s €7, Bombay Sapphire €8 or Hendrick’s €10. Mocktail available.' }), dish('Espresso martini', { price: '€6.50' }), dish('Mimosa', { price: '€6.50' }), dish('House lemonade'), dish('White or red sangria'), dish('Sparkling sangria'), dish('Passion fruit sangria')]),
  group('soft-drinks-beers-ciders', 'Soft drinks, beers & ciders', [
    dish('Sagres draught • small / pint', { price: '€2.00 / €3.50', description: '20cl / 48cl.' }),
    dish('Bohemia draught • small / pint', { price: '€2.25 / €3.75', description: '20cl / 48cl.' }),
    dish('Bandida do Pomar cider', { price: '€3.50', description: '40cl.' }), dish('Bottled beer', { price: '€2.20' }), dish('Somersby cider'), dish('Sagres 0.0%', { price: '€2.20' }), dish('Dos Santos craft beer'),
    dish('Bottled still water • small / large', { description: '50cl / 1.5L.' }), dish('Flavoured sparkling water', { price: '€2.00' }), item('Luso water • still / sparkling', '€1.90 / €2.90'),
    dish('Água das Pedras', { price: '€2.00' }), dish('Juice of the day', { price: '€3.75' }), dish('Fresh orange juice', { price: '€3.50' }), dish('Compal bottled juice', { price: '€2.00' }), dish('Soft drinks'), dish('Kombucha'),
  ]),
]

function prepare(sections) {
  return sections.map(category => ({ ...category, items: category.items.map(({ photo: _photo, ...entry }, index) => ({ ...entry, id: `${category.id}-${index + 1}`, image: null })) }))
}

export const restaurantMenus = { monchique: prepare(menuSections.map(category => ({ ...category, items: category.items.map(entry => entry.name === 'Baked Camembert' ? { ...entry, price: '€15.00' } : entry.name === 'Filtered still water' ? { ...entry, name: 'Filtered water • still / sparkling', price: '€2.70 / €1.90', description: '70cl.' } : entry) }))), portimao: prepare(portimao) }
