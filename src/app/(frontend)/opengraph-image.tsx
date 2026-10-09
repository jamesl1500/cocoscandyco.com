import { ImageResponse } from 'next/og'

import { getSiteInfo } from '@/lib/content'

export const alt = 'Candy and dessert catering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const site = await getSiteInfo()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          background: 'linear-gradient(135deg, #ffe3ec 0%, #fff8f1 55%, #ffeec2 100%)',
          color: '#33201c',
        }}
      >
        <div style={{ display: 'flex', fontSize: 36, color: '#c2255c', fontWeight: 700 }}>
          {site.tagline}
        </div>
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, marginTop: 16 }}>
          {site.name}
        </div>
        <div style={{ display: 'flex', fontSize: 34, marginTop: 28, maxWidth: 880 }}>
          Candy buffets, dessert tables and custom sweets for your event
        </div>
      </div>
    ),
    size,
  )
}
