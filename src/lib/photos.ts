export type Photo = {
  url: string
  alt: string
  width: number
  height: number
  caption?: string
}

// Web-sized crops of our own event photos, served from public/images.
export const photos = {
  table: {
    url: '/images/styled-candy-buffet-table.jpg',
    alt: 'Styled candy buffet table with apothecary jars of candy, swirl lollipops, wrapped rice crispy treats and chocolate-covered pretzel rods on a sage green tablecloth',
    width: 2000,
    height: 1042,
    caption: 'A full candy buffet, styled in sage, blush and gold',
  },
  jars: {
    url: '/images/candy-bar-jars-and-twist-lollipops.jpg',
    alt: 'Candy bar with twist lollipops in a gold pail, a glass jar of gummy bears, color-matched chocolate candies and gold tongs and scoops',
    width: 1400,
    height: 1304,
    caption: 'Self-serve candy with scoops, tongs and take-home bags',
  },
  treats: {
    url: '/images/chocolate-drizzled-rice-crispy-treats.jpg',
    alt: 'Rice crispy treats drizzled in green, yellow and pink chocolate, individually wrapped and tied with pink satin bows',
    width: 1200,
    height: 1500,
    caption: 'Chocolate-drizzled rice crispy treats, wrapped and bowed',
  },
  pretzels: {
    url: '/images/chocolate-covered-pretzel-rods.jpg',
    alt: 'Tray of chocolate-covered pretzel rods with drizzle in three colors, each wrapped and tied with a gold twist',
    width: 1200,
    height: 1303,
    caption: 'Chocolate-covered pretzel rods in your event colors',
  },
  lollipops: {
    url: '/images/swirl-lollipops-candy-buffet.jpg',
    alt: 'Gold pail filled with pink, orange and green swirl lollipops on a candy buffet',
    width: 1000,
    height: 895,
    caption: 'Swirl lollipops, color-matched to the table',
  },
} satisfies Record<string, Photo>

export const galleryPhotos: Photo[] = [
  photos.table,
  photos.treats,
  photos.pretzels,
  photos.lollipops,
]
