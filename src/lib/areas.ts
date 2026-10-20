import type { FaqContent } from './data'

// States we take bookings in. The home state comes first; HOME_BASE in site.ts says where the business is based.
export const regions = {
  NC: { name: 'North Carolina', short: 'the Triangle' },
  OH: { name: 'Ohio', short: 'Northeast and Central Ohio' },
} as const

export type RegionCode = keyof typeof regions

export type ServiceArea = {
  slug: string
  name: string
  county: string
  region: RegionCode
  // One-line summary used on cards and in search descriptions.
  summary: string
  paragraphs: string[]
  occasions: string[]
  // Neighborhoods and nearby communities covered from this area.
  nearby: string[]
  // Questions people planning an event in this area ask. Shown on the page and marked up as an FAQPage.
  faqs: FaqContent[]
}

export const serviceCounties: { name: string; region: RegionCode }[] = [
  { name: 'Orange County', region: 'NC' },
  { name: 'Durham County', region: 'NC' },
  { name: 'Chatham County', region: 'NC' },
  { name: 'Wake County', region: 'NC' },
  { name: 'Alamance County', region: 'NC' },
  { name: 'Cuyahoga County', region: 'OH' },
  { name: 'Franklin County', region: 'OH' },
]

// Local landing pages. Each one needs its own copy: near-duplicate pages with only the city name swapped get
// treated as doorway pages by search engines.
export const serviceAreas: ServiceArea[] = [
  {
    slug: 'chapel-hill-nc',
    name: 'Chapel Hill',
    county: 'Orange County',
    region: 'NC',
    summary:
      'Our home base. Candy buffets and dessert tables for graduations, weddings and campus-town celebrations.',
    paragraphs: [
      'Chapel Hill is home, so this is where we set up most often. From graduation weekends in May to fall weddings and game-day gatherings, we style candy buffets and dessert tables around your colors, including plenty of Carolina blue when the occasion calls for it.',
      'Being local means short delivery runs and flexible setup windows, whether your event is at a private home, a neighborhood clubhouse or a venue near Franklin Street. Tell us the date and the space and we will plan a table that fits it.',
    ],
    occasions: [
      'Graduation parties and open houses',
      'Weddings, showers and rehearsal dinners',
      'Birthday parties and baby showers',
      'Department, office and alumni events',
    ],
    nearby: [
      'Southern Village',
      'Meadowmont',
      'Governors Club',
      'Briar Chapel',
      'Downtown Chapel Hill',
    ],
    faqs: [
      {
        question: 'Can you set up for a UNC graduation party?',
        answer:
          'Yes. Graduation weekend is one of the busiest times of year in Chapel Hill, so get in touch as soon as you have a date. We can style the table in Carolina blue or in your graduate’s own school colors, at a home, clubhouse or venue.',
      },
      {
        question: 'Do you set up at private homes in Chapel Hill?',
        answer:
          'Yes. We set up at private homes and neighborhood clubhouses as well as venues. Tell us about the space and we will size the table to fit it and plan delivery, setup and teardown around your schedule.',
      },
    ],
  },
  {
    slug: 'carrboro-nc',
    name: 'Carrboro',
    county: 'Orange County',
    region: 'NC',
    summary:
      'Right next door to Chapel Hill. Sweets tables for backyard parties, showers and community events.',
    paragraphs: [
      'Carrboro sits right beside Chapel Hill, so it is one of the easiest places for us to reach. Events here tend to be relaxed and personal, and a candy bar suits them well: guests help themselves, kids love it and it doubles as the party favor.',
      'We scale tables to fit smaller spaces, from a porch or backyard to a community room, and can lean playful and colorful or keep things simple and neutral to match the rest of your day.',
    ],
    occasions: [
      'Backyard birthdays and family gatherings',
      'Baby showers and bridal showers',
      'School, club and community events',
      'Small weddings and elopement receptions',
    ],
    nearby: ['Downtown Carrboro', 'Lake Hogan Farms', 'Calvander', 'White Cross'],
    faqs: [
      {
        question: 'Can you fit a candy bar into a small space?',
        answer:
          'Yes. Carrboro events are often on a porch, in a backyard or in a community room, and we scale the table to the space and guest count rather than to a fixed package.',
      },
      {
        question: 'Can the candy bar double as party favors?',
        answer:
          'It can. Guests fill a bag or box from the buffet on the way out, so the table takes care of favors as well as dessert. Ask about bags or boxes in your colors when you request a quote.',
      },
    ],
  },
  {
    slug: 'durham-nc',
    name: 'Durham',
    county: 'Durham County',
    region: 'NC',
    summary:
      'Candy bars and dessert stations for Bull City weddings, university events and company parties.',
    paragraphs: [
      'Durham is a short drive from our Chapel Hill base and a regular stop for us. Its mix of renovated warehouse venues, university events and growing companies makes for a wide range of tables, from a late-night candy bar at a downtown wedding to branded sweets for a team celebration.',
      'For company events around downtown Durham and Research Triangle Park, we match candy and packaging to your brand colors and handle delivery, setup and teardown around your schedule.',
    ],
    occasions: [
      'Wedding receptions and late-night candy bars',
      'Graduation and university celebrations',
      'Corporate events, launches and holiday parties',
      'Client and employee gift boxes',
    ],
    nearby: ['Downtown Durham', 'Southpoint', 'Hope Valley', 'Woodcroft', 'Research Triangle Park'],
    faqs: [
      {
        question: 'Do you cater company events in Research Triangle Park?',
        answer:
          'Yes. We set up candy bars and dessert stations for team celebrations, launches and holiday parties in downtown Durham and RTP, and can deliver boxed sweets for client and employee gifts in your brand colors.',
      },
      {
        question: 'Can you do a late-night candy bar for a Durham wedding?',
        answer:
          'Yes. A late-night candy bar is a popular wedding add-on. We coordinate timing with your venue and planner so it is ready when the dancing starts.',
      },
    ],
  },
  {
    slug: 'hillsborough-nc',
    name: 'Hillsborough',
    county: 'Orange County',
    region: 'NC',
    summary:
      'Dessert tables styled for historic-town weddings, farm venues and family celebrations.',
    paragraphs: [
      'Hillsborough, the Orange County seat, is known for its historic downtown and the farms and country properties around it. Those settings are a natural fit for a styled dessert table, and we plan displays that sit comfortably alongside rustic and garden wedding decor.',
      'Outdoor and barn events take a little extra planning for heat and timing. We choose sweets that hold up to the season and coordinate arrival with your planner or venue so the table is fresh when guests arrive.',
    ],
    occasions: [
      'Farm, barn and garden weddings',
      'Anniversary and milestone birthday parties',
      'Bridal and baby showers',
      'Church and community gatherings',
    ],
    nearby: ['Historic Downtown Hillsborough', 'Efland', 'Cedar Grove', 'Waterstone'],
    faqs: [
      {
        question: 'Can you set up a dessert table at an outdoor or barn wedding?',
        answer:
          'Yes. For outdoor and barn venues around Hillsborough we choose sweets that hold up to the season and time the setup with your planner so the table is fresh when guests arrive.',
      },
      {
        question: 'Will the table match rustic or garden wedding decor?',
        answer:
          'Yes. We plan the stands, containers and colors around the rest of your decor so the dessert table looks like part of the day rather than an add-on.',
      },
    ],
  },
  {
    slug: 'pittsboro-nc',
    name: 'Pittsboro',
    county: 'Chatham County',
    region: 'NC',
    summary:
      'Sweets for Chatham County weddings and parties, from village venues to lakeside gatherings.',
    paragraphs: [
      'South of Chapel Hill, Pittsboro and the rest of Chatham County have become one of the area’s favorite places to get married, with village, farm and lakeside settings a short drive apart. We bring candy buffets, dessert tables and wedding favors to celebrations throughout the county.',
      'As new neighborhoods grow around Pittsboro, we are also setting up for more birthday parties, showers and community events. Whatever the occasion, your quote spells out delivery and setup so there are no surprises.',
    ],
    occasions: [
      'Wedding receptions and favor boxes',
      'Rehearsal dinners and welcome parties',
      'Neighborhood and community events',
      'Birthdays, showers and graduations',
    ],
    nearby: ['Fearrington Village', 'Chatham Park', 'Briar Chapel', 'Jordan Lake', 'Siler City'],
    faqs: [
      {
        question: 'Do you cater weddings in Fearrington Village and around Jordan Lake?',
        answer:
          'Yes. We bring candy buffets, dessert tables and wedding favors to venues throughout Chatham County, including Fearrington Village, Briar Chapel and the lakeside venues near Jordan Lake.',
      },
      {
        question: 'Do you also do wedding favor boxes?',
        answer:
          'Yes. We can pack favor boxes or bags in your wedding colors, set out on a favor table or placed at each seat. Mention favors in your quote request and we will include them.',
      },
    ],
  },
  {
    slug: 'cary-nc',
    name: 'Cary',
    county: 'Wake County',
    region: 'NC',
    summary:
      'Candy buffets for family celebrations, school events and corporate gatherings in western Wake County.',
    paragraphs: [
      'Cary is full of family milestones: birthdays, graduations, quinceañeras, showers and holiday parties. A self-serve candy buffet works for all of them, and we build each one around your theme and the sweets your guests actually like.',
      'Cary and neighboring Morrisville and Apex are also home to many company offices. For team events and client appreciation, we set up candy bars and dessert stations on site or deliver boxed sweets in your brand colors.',
    ],
    occasions: [
      'Birthdays, quinceañeras and sweet sixteens',
      'Graduation parties',
      'Office parties and client appreciation',
      'School and neighborhood events',
    ],
    nearby: ['Downtown Cary', 'Preston', 'Amberly', 'Morrisville', 'Apex'],
    faqs: [
      {
        question: 'Can you do a candy buffet for a quinceañera or sweet sixteen?',
        answer:
          'Yes. We build the candy buffet for milestone birthdays around the theme and colors of the party and the sweets your guests actually like.',
      },
      {
        question: 'Do you deliver to offices in Cary, Morrisville and Apex?',
        answer:
          'Yes. We set up candy bars and dessert stations for office parties and client appreciation events, or deliver boxed sweets in your brand colors.',
      },
    ],
  },
  {
    slug: 'raleigh-nc',
    name: 'Raleigh',
    county: 'Wake County',
    region: 'NC',
    summary: 'Dessert tables and candy bars for Raleigh weddings, galas and company events.',
    paragraphs: [
      'We travel across the Triangle to Raleigh for weddings, galas and larger company events. Bigger guest lists are where a dessert table earns its keep: plenty of variety, easy for guests to serve themselves and a showpiece for the room.',
      'Because Raleigh is farther from our Chapel Hill base, we recommend booking early, especially for spring and fall weekends. We will confirm availability for your date and itemize delivery and setup in your quote.',
    ],
    occasions: [
      'Wedding receptions',
      'Galas, fundraisers and conferences',
      'Corporate launches and holiday parties',
      'Graduations and milestone birthdays',
    ],
    nearby: ['Downtown Raleigh', 'North Hills', 'Brier Creek', 'Five Points', 'Wake Forest'],
    faqs: [
      {
        question: 'How early should I book for a Raleigh event?',
        answer:
          'Raleigh is farther from our Chapel Hill base, so we recommend booking as early as you can, especially for spring and fall weekends. Send your date and we will confirm availability.',
      },
      {
        question: 'Can you handle a large gala or conference?',
        answer:
          'Yes. Bigger guest lists are where a dessert table earns its keep. We plan enough variety and quantity for the whole room and coordinate setup with your event team.',
      },
    ],
  },
  {
    slug: 'mebane-nc',
    name: 'Mebane',
    county: 'Alamance County',
    region: 'NC',
    summary:
      'Candy and dessert catering west of the Triangle, for Mebane, Graham and Burlington events.',
    paragraphs: [
      'Mebane sits between the Triangle and the Triad, a straight run west of Chapel Hill. We cater celebrations here and on toward Graham and Burlington, bringing the same styled tables and take-home treats we set up closer to home.',
      'Tell us about your venue, whether it is a downtown event space, a church hall or a family property, and we will size the table to your guest count and plan delivery around your day.',
    ],
    occasions: [
      'Weddings and anniversary parties',
      'Baby showers and gender reveals',
      'Church and family reunions',
      'Birthday and graduation parties',
    ],
    nearby: ['Downtown Mebane', 'Graham', 'Burlington', 'Haw River', 'Saxapahaw'],
    faqs: [
      {
        question: 'Do you travel to Graham and Burlington?',
        answer:
          'Yes. From Mebane we cater events on toward Graham, Burlington and Haw River. Tell us where the event is and we will confirm the details in your quote.',
      },
      {
        question: 'Can you set up in a church hall or family property?',
        answer:
          'Yes. We size the table to your space and guest count and plan delivery and setup around your day, whether it is a church hall, an event space or a family property.',
      },
    ],
  },
  {
    slug: 'cleveland-oh',
    name: 'Cleveland',
    county: 'Cuyahoga County',
    region: 'OH',
    summary:
      'Candy buffets and dessert tables for Cleveland weddings, graduations, galas and company celebrations.',
    paragraphs: [
      'Cleveland celebrations run from lakefront and downtown weddings to graduation open houses, hospital and university events and company parties on both sides of the Cuyahoga. A styled candy buffet or dessert table fits all of them: guests serve themselves, it anchors the room and what is left goes home as favors.',
      'We plan Cleveland tables around your colors, your guest count and the sweets your crowd actually reaches for, from classic candy bar jars to chocolate-covered pretzels and rice crispy treats. Because Ohio events are planned around travel, we recommend getting in touch as early as you can. Your quote spells out delivery, setup and teardown so nothing is left to guess.',
    ],
    occasions: [
      'Wedding receptions and late-night candy bars',
      'Graduation open houses',
      'Galas, fundraisers and hospital or university events',
      'Corporate parties and client gift boxes',
    ],
    nearby: [
      'Downtown Cleveland',
      'Ohio City',
      'Tremont',
      'University Circle',
      'Lakewood',
      'Shaker Heights',
    ],
    faqs: [
      {
        question: 'How far ahead should I book a candy buffet in Cleveland?',
        answer:
          'As early as you can. We plan Ohio events around travel, so popular weekends fill first. Send your date, venue and guest count and we will confirm availability and reply with an itemized quote.',
      },
      {
        question: 'Do you do graduation open house tables in Cleveland?',
        answer:
          'Yes. Open houses are a natural fit for a self-serve candy bar because guests come and go all afternoon. We style the table in your graduate’s school colors and size it to the number of guests you expect.',
      },
    ],
  },
  {
    slug: 'westlake-oh',
    name: 'Westlake',
    county: 'Cuyahoga County',
    region: 'OH',
    summary:
      'Dessert tables and candy bars for Westlake and west-side suburb weddings, showers and family parties.',
    paragraphs: [
      'Westlake and the neighboring west-side suburbs are full of family milestones: showers, first birthdays, graduations, anniversaries and holiday parties, plus weddings at clubs and banquet venues close to the lake. A dessert table or candy bar gives each of them a centerpiece that guests actually use.',
      'Plenty of west-side celebrations happen at home or in a clubhouse, so we size the table to the space, from a kitchen island spread to a full buffet in a party room. Tell us the date and where it is, and we will plan the sweets, the styling and the setup window around your day.',
    ],
    occasions: [
      'Baby showers, bridal showers and first birthdays',
      'Graduation and holiday parties at home',
      'Club and banquet hall weddings',
      'Anniversaries and milestone birthdays',
    ],
    nearby: ['Bay Village', 'Rocky River', 'North Olmsted', 'Avon Lake', 'Avon', 'Crocker Park'],
    faqs: [
      {
        question: 'Can you set up a dessert table in my home in Westlake?',
        answer:
          'Yes. Tell us about the room and the guest count and we will scale the table to fit, whether it is a kitchen island, a dining table or a party room, and handle setup and teardown.',
      },
      {
        question: 'Do you cater Bay Village, Rocky River and Avon Lake too?',
        answer:
          'Yes. We take bookings across the west-side suburbs around Westlake. Include the venue or town in your quote request and we will confirm the details.',
      },
    ],
  },
  {
    slug: 'columbus-oh',
    name: 'Columbus',
    county: 'Franklin County',
    region: 'OH',
    summary:
      'Candy bars and dessert stations for Columbus weddings, Ohio State celebrations and corporate events.',
    paragraphs: [
      'Columbus is a city of big celebrations: Ohio State graduations and game-day parties, weddings in the Short North and German Village, and a long list of company headquarters with team events and client gifting to plan. A candy bar or dessert station scales from a backyard party to a ballroom.',
      'Scarlet and gray is always an option, but every table is built around your own theme and colors. Because we plan Ohio events around travel, book as early as you can, especially for graduation season and fall weekends. Your quote itemizes delivery, setup and teardown.',
    ],
    occasions: [
      'Ohio State graduations and tailgate parties',
      'Wedding receptions and favor tables',
      'Corporate events, conferences and holiday parties',
      'Client and employee gift boxes',
    ],
    nearby: [
      'Short North',
      'German Village',
      'Dublin',
      'Upper Arlington',
      'Worthington',
      'Westerville',
    ],
    faqs: [
      {
        question: 'Can you do a scarlet and gray candy bar for an Ohio State party?',
        answer:
          'Yes. We can build the whole table in scarlet and gray for a graduation or game-day party, or in any other team or school colors you want.',
      },
      {
        question: 'Do you cater corporate events in Columbus?',
        answer:
          'Yes. We set up candy bars and dessert stations for team celebrations, conferences and holiday parties, and can deliver boxed sweets for client and employee gifts in your brand colors.',
      },
    ],
  },
]

export const getServiceArea = (slug: string) => serviceAreas.find((area) => area.slug === slug)

// "Durham, NC"
export const areaPlace = (area: Pick<ServiceArea, 'name' | 'region'>) =>
  `${area.name}, ${area.region}`

export const areasInRegion = (region: RegionCode) =>
  serviceAreas.filter((area) => area.region === region)

// The regions that have at least one service area, in the order they are declared above.
export const activeRegions = (Object.keys(regions) as RegionCode[]).filter(
  (region) => areasInRegion(region).length > 0,
)

// "A, B and C"
export const joinList = (items: string[]) =>
  items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
