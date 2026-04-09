# Mohamed Hassan Mohamed — Portfolio

Personal portfolio website for an Architect, BIM Coordinator & Project Coordinator. Built with React + Vite, styled with CSS Modules.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Netlify Deployment

### Option 1: Drag-and-drop

1. Run `npm run build`
2. Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop)

### Option 2: Git-connected deployment

1. Push this repo to GitHub
2. Connect the repo in Netlify
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy

The included `netlify.toml` handles build configuration automatically.

## Design Choices

- **CSS Modules** for zero-runtime scoped styles with full design control
- **Inter typeface** for its geometric, architecture-inspired character
- **Warm neutral palette** with dark goldenrod (`#B8860B`) accent — referencing brass architectural hardware
- **CSS grid-pattern overlay** on the hero for a blueprint aesthetic without external images
- **Intersection Observer** powers all scroll animations (no heavy libraries)
- **Content separated into `src/data/content.js`** — update CV data in one place

## Tech Stack

- React 18
- Vite 6
- CSS Modules
- Zero external UI dependencies
