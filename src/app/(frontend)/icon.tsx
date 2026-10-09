import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// Placeholder favicon: swap for a real logo by replacing this file with icon.png or icon.svg.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
          background: '#c2255c',
          color: '#ffffff',
          fontSize: 42,
          fontWeight: 700,
        }}
      >
        C
      </div>
    ),
    size,
  )
}
