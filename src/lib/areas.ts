export type ServiceArea = {
  slug: string
  name: string
  county: string
  // One-line summary used on cards and in search descriptions.
  summary: string
  paragraphs: string[]
  occasions: string[]
  // Neighborhoods and nearby communities covered from this area.
  nearby: string[]
}

export const serviceCounties = [
  'Orange County',
  'Durham County',
  'Chatham County',
  'Wake County',
  'Alamance County',
] as const

// Local landing pages. Each one needs its own copy: near-duplicate pages with only the city name swapped get
// treated as doorway pages by search engines.
export const serviceAreas: ServiceArea[] = [
  {
    slug: 'chapel-hill-nc',
    name: 'Chapel Hill',
    county: 'Orange County',
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
  },
  {
    slug: 'carrboro-nc',
    name: 'Carrboro',
    county: 'Orange County',
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
  },
  {
    slug: 'durham-nc',
    name: 'Durham',
    county: 'Durham County',
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
  },
  {
    slug: 'hillsborough-nc',
    name: 'Hillsborough',
    county: 'Orange County',
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
  },
  {
    slug: 'pittsboro-nc',
    name: 'Pittsboro',
    county: 'Chatham County',
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
  },
  {
    slug: 'cary-nc',
    name: 'Cary',
    county: 'Wake County',
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
  },
  {
    slug: 'raleigh-nc',
    name: 'Raleigh',
    county: 'Wake County',
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
  },
  {
    slug: 'mebane-nc',
    name: 'Mebane',
    county: 'Alamance County',
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
  },
]

export const getServiceArea = (slug: string) => serviceAreas.find((area) => area.slug === slug)
