# Project images

Drop your project images in this folder, then list them in
`src/data/projects.ts` via the `images` array (one project can have several).

```ts
{
  id: 'avhealth-platform',
  name: 'AVHealth Platform',
  description: { en: '...', pt: '...' },
  images: [
    '/projects/avhealth-1.png', // ← paths start at /projects
    '/projects/avhealth-2.png',
  ],
}
```

- Recommended aspect ratio: **16:10** (e.g. 1280×800).
- Formats: `.png`, `.jpg`, `.webp` (avoid `.svg` — Next/Image needs extra config for it).
- 1 image → shown full width; 2+ images → shown in a 2-column grid.
- If `images` is empty, a gradient placeholder with the project initials is shown.
