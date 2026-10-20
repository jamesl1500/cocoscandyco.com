import type { MenuCategory } from './options'
import { photos } from './photos'

export type ServiceContent = {
  slug: string
  title: string
  tagline?: string
  summary: string
  description: string
  priceFrom?: string
  highlights: string[]
  image?: { url: string; alt: string; width: number; height: number }
  seoTitle?: string
  seoDescription?: string
}

export type MenuItemContent = {
  name: string
  category: MenuCategory
  description?: string
  dietary: string[]
  price?: string
}

export type TestimonialContent = {
  quote: string
  author: string
  eventType?: string
}

export type FaqContent = {
  question: string
  answer: string
}

// The site's content. Edit it here and redeploy.

export const services: ServiceContent[] = [
  {
    slug: 'charcuterie-boards',
    title: 'Charcuterie Boards',
    tagline: 'Beautiful Bites, Made for Sharing.',
    summary:
      'Custom-curated boards of cheeses, cured meats, crackers, fruit and complementary bites, arranged for gatherings of all kinds.',
    description:
      'Custom-curated charcuterie boards featuring a selection of cheeses, cured meats, crackers, fresh and dried fruits, and other complementary bites. Each board is thoughtfully arranged to create a beautiful presentation for gatherings of all kinds.\n\nWe customize every board to the size of your gathering, your preferences and your budget.',
    highlights: [
      'A selection of cheeses and cured meats',
      'Crackers, fresh and dried fruits and complementary bites',
      'Sized to your gathering, preferences and budget',
    ],
  },
  {
    slug: 'grazing-tables',
    title: 'Grazing Tables',
    tagline: 'A Feast for the Eyes and the Taste Buds.',
    summary:
      'Styled grazing tables of cheeses, meats, fruits, crackers and accompaniments for parties, celebrations and special events.',
    description:
      'Beautifully styled grazing tables featuring a variety of cheeses, meats, fruits, crackers, and other delicious accompaniments. These displays are perfect for small parties, intimate gatherings, celebrations, and special events.\n\nWe customize every table to the size of your gathering, your preferences and your budget.',
    highlights: [
      'A variety of cheeses, meats, fruits and crackers',
      'Custom styling and themed color palettes',
      'Sized to your gathering, preferences and budget',
    ],
  },
  {
    slug: 'wine-and-charcuterie-pairing-experiences',
    title: 'Wine & Charcuterie Pairing Experiences',
    tagline: 'Sip, Savor, and Enjoy.',
    summary:
      'A curated charcuterie experience designed to complement a selection of wines, for a fun and elevated way to host.',
    description:
      'A curated charcuterie experience designed to complement a selection of wines. Guests can enjoy thoughtfully paired cheeses, meats, fruits, crackers, and other bites for a fun and elevated hosting experience.',
    highlights: [
      'Cheeses, meats and bites paired to a selection of wines',
      'Fruits, crackers and other accompaniments',
      'Planned around your gathering and preferences',
    ],
  },
  {
    slug: 'candy-buffets',
    title: 'Candy Buffets',
    summary:
      'A styled, self-serve candy bar in your colors, with jars, scoops and take-home bags for every guest.',
    description:
      'Our candy buffets are built around your event: your palette, your theme and the sweets your guests actually love. We plan the selection with you, style the table and handle setup and teardown.\n\nGuests fill a bag with their favorites, so the buffet doubles as a party favor and a place people gather all night.',
    highlights: [
      'Candy selection matched to your colors and theme',
      'Jars, scoops, signage and take-home bags',
      'Delivery, styling, setup and teardown',
    ],
    image: photos.lollipops,
  },
  {
    slug: 'dessert-tables',
    title: 'Dessert Tables',
    summary:
      'A full spread of bite-size sweets, from chocolate-dipped treats to cookies and confections, styled as a centerpiece.',
    description:
      'A dessert table gives guests variety and gives your event a showpiece. We combine bite-size baked sweets, chocolates and candy into a display that photographs as well as it tastes.\n\nWe size the table to your guest count and can stand in for, or sit alongside, a traditional cake.',
    highlights: [
      'A mix of bite-size sweets sized to your guest count',
      'Stands, platters and table styling',
      'Works with or instead of a cake',
    ],
    image: photos.table,
  },
  {
    slug: 'wedding-sweets-and-favors',
    title: 'Wedding Sweets & Favors',
    summary:
      'Favor boxes, welcome-bag treats and reception sweets designed around your wedding day.',
    description:
      'From the favors at each place setting to a late-night candy bar, we design wedding sweets that fit the look and feel of your day.\n\nWe coordinate with your planner and venue on timing and placement, so there is one less thing for you to manage.',
    highlights: [
      'Custom favor boxes and packaging',
      'Reception candy bars and dessert displays',
      'Coordination with your planner and venue',
    ],
    image: photos.treats,
  },
  {
    slug: 'corporate-events-and-gifting',
    title: 'Corporate Events & Gifting',
    summary:
      'Branded candy bars for launches and office parties, plus boxed sweets for clients and teams.',
    description:
      'Sweets are an easy way to make a company event feel generous. We set up candy bars and dessert stations for launches, conferences, open houses and holiday parties.\n\nFor gifting, we package boxed sweets in your brand colors for clients and employees, in quantities small or large.',
    highlights: [
      'Candy and packaging in your brand colors',
      'Stations for launches, conferences and office parties',
      'Boxed gifts for clients and teams',
    ],
    image: photos.pretzels,
  },
]

export const menuItems: MenuItemContent[] = [
  {
    name: 'Cheese & Cured Meat Selections',
    category: 'charcuterie',
    description: 'The heart of every board and table, with additional selections available.',
    dietary: [],
  },
  {
    name: 'Fresh & Dried Fruit Assortments',
    category: 'charcuterie',
    dietary: [],
  },
  {
    name: 'Assorted Crackers & Specialty Accompaniments',
    category: 'charcuterie',
    dietary: [],
  },
  {
    name: 'Wine-Pairing Selections',
    category: 'charcuterie',
    description: 'Cheeses, meats and bites chosen to complement a selection of wines.',
    dietary: [],
  },
  {
    name: 'Chocolate-Covered Rice Crispy Treats',
    category: 'chocolate',
    dietary: [],
  },
  {
    name: 'Chocolate-Covered Pretzel Rods',
    category: 'chocolate',
    dietary: [],
  },
  {
    name: 'Dessert Bites & Sweet Treats',
    category: 'baked',
    dietary: [],
  },
  {
    name: 'Gummy Assortment',
    category: 'candy',
    description: 'Bears, rings, worms and sour belts, chosen to match your palette.',
    dietary: [],
  },
  {
    name: 'Old-Fashioned Favorites',
    category: 'candy',
    description: 'Rock candy, lollipops, taffy and candy sticks.',
    dietary: [],
  },
  {
    name: 'Chocolate-Coated Classics',
    category: 'candy',
    description: 'Chocolate-covered pretzels, almonds and espresso beans.',
    dietary: [],
  },
  {
    name: 'Hand-Rolled Truffles',
    category: 'chocolate',
    description: 'Dark, milk and white chocolate truffles in rotating flavors.',
    dietary: [],
  },
  {
    name: 'Chocolate Bark',
    category: 'chocolate',
    description: 'Broken slabs topped with nuts, dried fruit or crushed candy.',
    dietary: [],
  },
  {
    name: 'Dipped Strawberries',
    category: 'chocolate',
    description: 'Fresh strawberries dipped and drizzled to order.',
    dietary: [],
  },
  {
    name: 'Decorated Sugar Cookies',
    category: 'baked',
    description: 'Iced by hand to match your theme, monogram or logo.',
    dietary: [],
  },
  {
    name: 'Mini Cupcakes',
    category: 'baked',
    description: 'Two-bite cupcakes in your choice of flavors.',
    dietary: [],
  },
  {
    name: 'Brownie & Blondie Bites',
    category: 'baked',
    description: 'Fudgy squares, easy to grab and share.',
    dietary: [],
  },
  {
    name: 'Seasonal Specials',
    category: 'seasonal',
    description: 'Holiday and seasonal sweets that change through the year.',
    dietary: [],
  },
  {
    name: 'Custom Styling & Themed Color Palettes',
    category: 'seasonal',
    description:
      'Boards, tables, sweets and packaging styled to match your event colors, theme or company brand.',
    dietary: [],
  },
]

export const faqs: FaqContent[] = [
  {
    question: 'What areas do you serve?',
    answer:
      'We are based in Chapel Hill, North Carolina and cater events across the Triangle, including Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh and Mebane, throughout Orange, Durham, Chatham, Wake and Alamance counties. We also take bookings in Ohio, in Cleveland, Westlake and Columbus. Planning something somewhere else? Ask and we will let you know if we can travel.',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'As early as you can. Popular dates fill up, so get in touch as soon as you have a date and venue, and we will confirm availability.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Every quote is tailored to the size of your gathering, your preferences and your budget, along with the items you choose and the level of styling and service. Tell us about your event and we will send an itemized quote.',
  },
  {
    question: 'Can you accommodate allergies and dietary needs?',
    answer:
      'Tell us about any allergies or dietary requirements in your inquiry and we will talk through the options that fit your event.',
  },
  {
    question: 'Do you handle delivery and setup?',
    answer:
      'Yes. We coordinate delivery, setup and teardown with you and your venue, and spell out exactly what is included in your quote.',
  },
  {
    question: 'Can the sweets match my theme or brand colors?',
    answer:
      'Yes. We plan the candy, packaging and table styling around your colors, theme or company branding.',
  },
]

// The home page only shows the testimonials section once there is at least one here.
export const testimonials: TestimonialContent[] = []
