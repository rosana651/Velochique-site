export const contactUrl = 'https://linktr.ee/velochique'
export const bookingUrl = 'https://velochique.booqableshop.com/'

export const socialLinks = [
  { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@velochique20' },
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/velochique/' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/velochique' },
]

export const ridesUrl = 'https://www.strava.com/clubs/782258'

export const locations = [
  { id: 'monchique', name: 'Monchique', description: 'The original. Mountains, coffee, food and a cycling hub.', address: 'Rua Serpa Pinto 8, Monchique', detail: 'Stop in before the climb or settle in after the descent. Our original mountain café brings the coffee bar, bike shop and workshop together.' },
  { id: 'portimao', name: 'Vista Rio · Portimão', description: 'Our riverside café in Portimão. Specialty coffee, brunch, lunch and more.', address: 'Zona Ribeirinha, Portimão', detail: 'Follow the river into Portimão for a slower start or a post-ride lunch. Meet us at Vista Rio for coffee and brunch by the water.' },
]

export const products = [
  { id: 'hoodies', name: 'Hoodies', price: 65, description: 'An easy layer for cool starts and evenings after the ride.' },
  { id: 'jerseys', name: 'Jerseys', price: 75, description: 'Velochique colours for the road, from the first climb to the café stop.' },
  { id: 'bib-shorts', name: 'Bib shorts', price: 95, description: 'A pared-back staple for long days in the saddle.' },
  { id: 'bottles', name: 'Bottles', price: 15, description: 'A refillable ride companion for the Algarve hills.' },
  { id: 'tote-bags', name: 'Tote bags', price: 20, description: 'An everyday carry for market mornings and coffee runs.' },
]

export const navigation = [

  { label: 'Bike rentals', href: bookingUrl },
  { label: 'Shop', href: '/shop' },
  { label: 'Rides & events', href: ridesUrl },
  { label: 'About', panel: 'about' },
  { label: 'Contact', href: '#contact' },
]

export const stories = {
  about: { title: 'Ride. Sip. Repeat.', label: 'About Velochique', text: 'Velochique is a meeting place for people who love bikes, good coffee and the Algarve. Find us in the hills of Monchique and by the water in Portimão.', action: 'Visit our cafés', href: '/#locations' },
  coffee: { title: 'Coffee at Velochique', label: 'Our coffee story', text: 'Good coffee is part of the ride here. Pull up a chair after a morning in the hills, meet a friend for brunch, or take a quiet moment at the espresso bar.', action: 'Find a café', href: '/#locations' },
  rentals: { title: 'Plan your ride', label: 'Bike rentals', text: 'Choose road, gravel or e-MTB. Contact the team with your dates, height and preferred collection point to check sizing and availability.', action: 'Booking & information', href: contactUrl },
  workshop: { title: 'Visit the workshop', label: 'Bike support', text: 'For repairs and servicing, contact the Monchique team with your bike model and the work it needs.', action: 'Contact the team', href: contactUrl },
}



