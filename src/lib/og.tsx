import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { siteName } from '@/lib/site'

/** Link preview size used by WhatsApp, Instagram, LinkedIn, X, etc. */
export const ogSize = { width: 1200, height: 630 }

const INK = '#0d0d0d'
const FG = '#f5f5f5'
const MUTED = '#b5b5b5'
const LINE = '#2c2c2c'
const ACCENT = '#2dd4bf'

/** Share image in the site's style: logo + brand, big Geometos title, subtitle, tags. */
export async function renderShareImage({
  eyebrow,
  title,
  subtitle,
  tags,
}: {
  eyebrow: string
  title: string
  subtitle: string
  tags: string[]
}) {
  // process.cwd() is the project root, both in dev and at build time.
  const [geometos, outfit, outfitMedium, logo] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Geometos.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/Outfit-Regular.ttf')),
    readFile(join(process.cwd(), 'src/assets/fonts/Outfit-Medium.ttf')),
    readFile(join(process.cwd(), 'public/logo.png')),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: INK,
          fontFamily: 'Outfit',
          backgroundImage:
            'radial-gradient(ellipse at 85% 0%, rgba(45,212,191,0.22), transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(120,140,150,0.25), transparent 55%)',
          color: FG,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img src={logoSrc} width={64} height={64} alt="" />
          <div style={{ fontFamily: 'Geometos', fontSize: 30, letterSpacing: 4 }}>
            {siteName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 500, color: MUTED }}
          >
            <div style={{ width: 12, height: 12, backgroundColor: ACCENT }} />
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: 'Geometos',
              fontSize: title.length > 22 ? 80 : 104,
              lineHeight: 0.95,
              maxWidth: 1000,
            }}
          >
            {title.toUpperCase()}
          </div>
          <div style={{ marginTop: 28, fontSize: 32, lineHeight: 1.35, color: MUTED, maxWidth: 960 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                border: `2px solid ${LINE}`,
                padding: '8px 16px',
                fontSize: 22,
                fontWeight: 500,
                color: MUTED,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Outfit', data: outfit, style: 'normal', weight: 400 },
        { name: 'Outfit', data: outfitMedium, style: 'normal', weight: 500 },
        { name: 'Geometos', data: geometos, style: 'normal', weight: 400 },
      ],
    },
  )
}
