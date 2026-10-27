'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import type { Dictionary } from '@/i18n/dictionaries'

type Labels = Dictionary['projects']

// Cycled backdrops used for the placeholder when a project has no images yet.
const gradients = [
  'from-slate-500/25 to-transparent',
  'from-stone-500/25 to-transparent',
  'from-teal-700/25 to-transparent',
  'from-zinc-500/25 to-transparent',
]

function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('')
}

export default function ProjectGallery({
  images,
  name,
  index,
  labels,
}: {
  images: string[]
  name: string
  index: number
  labels: Labels
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const go = useCallback(
    (delta: number) =>
      setOpenIndex((prev) =>
        prev === null ? prev : (prev + delta + images.length) % images.length,
      ),
    [images.length],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, go])

  if (images.length === 0) {
    return (
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-line bg-ink bg-linear-to-br ${
          gradients[index % gradients.length]
        }`}
      >
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_4px)]"
          aria-hidden
        />
        <span className="relative font-display text-display text-fg/15">
          {initials(name)}
        </span>
      </div>
    )
  }

  const single = images.length === 1

  return (
    <>
      <div className={`grid gap-4 ${single ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden border border-line bg-ink"
          >
            <Image
              src={src}
              alt={`${name} — ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={name}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 text-xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label={labels.previous}
              className="absolute left-4 flex h-11 w-11 items-center justify-center border border-white/20 text-2xl text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              ‹
            </button>
          )}

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${name} — ${openIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label={labels.next}
              className="absolute right-4 flex h-11 w-11 items-center justify-center border border-white/20 text-2xl text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 border border-white/20 px-3 py-1 text-xs font-medium tracking-[0.2em] text-white">
              {openIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
