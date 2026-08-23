# Collider

A shadcn-style registry of **ready-to-use Three.js and SVG elements** for the modern web.

Every element is production-ready: typed options, automatic resize handling via
`ResizeObserver`, devicePixelRatio capping, and a cleanup function that disposes
all GPU resources. Copy the source, paste it into your project, own every line.

## Elements (204)

| Category | Kind | Deps | Count | Highlights |
| --- | --- | --- | --- | --- |
| Motion | GSAP/CSS | `gsap` (some) | 21 | text-reveal, words-slide, scroll-reveal, parallax-layers, magnetic-button, counter-roll, marquee-loop, letter-scramble, elastic-drag, typewriter, wave-text, click-burst, hover-reveal, progress-scrub, stagger-grid, cursor-blob, elastic-nav, shine-button, scrub-text, split-flap, pendulum |
| 2.5D | JS depth | none | 10 | tilt-card, layered-scene, depth-fan, room-window, hologram-panel, moving-shadow, popup-book, city-blocks, floating-light, extruded-badge |
| Buttons | HTML/CSS/JS | none | 11 | glow, neon-outline, glass, loading, icon-slide, social-circles, border-trace, elastic-press, toggle-switch, copy-feedback, slide-text |
| Effects | CSS/vanilla | none | 14 | glass-card, neon-text, rotating-border, shimmer-skeleton, spotlight-card, glitch-text, flip-card, aurora-border, blob-morph, gradient-text-flow, typing-dots, chromatic-hover, vignette-panel, input-glow |
| Loaders | mixed | some three | 9 | dots, ring, bars, orbit-css, liquid, flip + WebGL: orbit-loader, pulse-ring, wire-cube |
| Elementals | SVG | none | 13 | flame, tide, terra, gale, volt, frost, magma, lumen, umbra, blizzard, quake, thorn, echo |
| Backgrounds | WebGL/canvas | varies | 14 | particle-field, wave-plane, grid-floor, galaxy-spiral, star-hyperspace, torus-tunnel, dot-terrain, ripple-rings, flow-field, fog-drift, aurora-curtain, plasma, color-waves, bokeh-lights |
| Objects | WebGL | three | 6 | distorted-sphere, wireframe-globe, liquid-knot, shard-crystal, helix-strand, monolith |
| Heroes | WebGL/canvas | varies | 8 | floating-shapes, constellation-network, text-particles, spotlight-stage, ring-portal, matrix-rain, bubble-stream |
| Vector | SVG | none | 24 | aurora-mesh → diagonal-stripes |
| Shapes | SVG | none | 9 | rings, arcs, triangles, ribbon, waves, confetti, stairs, dunes, pill-grid |
| Textures | SVG filters | none | 16 | static, paper, marble, halftone, plaid, carbon, blueprint, watercolor, grain, sand, knit, fog, brick, denim, cork, terrazzo |
| Isometric | SVG | none | 8 | cube, tower, server, trees, boxes, desk-setup, gift, house |
| Avatars | SVG | none | 20 | initials, pixel identicon, blob, shapes, status, cat, robot, animal ×4 (bear/panda/frog/fox), orbit, story-ring, ghost, slime, wizard, knight, owl, penguin, bunny, tiger, alien, mushroom |
| Monsters | SVG | none | 22 | Emberling, Tideling, Sproutling, Zapling, Wispling, capture-core, Golemling, Toxiling, Crystaling, Fluffling, Bubbling, Shroomling, Fangling, Cactling, Drakeling, Starning, Wormling, Mothling, Sluggo, Boltbeetle, Jellyling, Koiling |

> The Monsters section contains original chibi creatures inspired by classic
> creature-collector games. Not affiliated with Nintendo or The Pokémon Company.

## Stack

- [Astro](https://astro.build) — static site, zero JS by default
- [Three.js](https://threejs.org) — WebGL elements, code-split per element
- Vanilla SVG generators — vector art renders server-side, animates via SMIL

## Development

```sh
npm install
npm run dev        # start dev server (use: astro dev --background)
npm run build      # static build to ./dist
npx astro check    # typecheck
```

### Adding an element

1. **WebGL** — create `src/elements/<slug>.ts` exporting
   `create<Name>(container: HTMLElement, options?): () => void`.
2. **SVG** (vector, isometric, avatars, monsters) — create
   `src/<category-dir>/<slug>.ts` exporting
   `create<Name>(options?): string` that returns the final markup.
3. Register it in `src/lib/registry.ts` (name, description, category, kind).
4. Wire it up in `src/lib/sources.ts`, and for WebGL also
   `src/lib/mount.ts` + `src/lib/examples.ts`.

The docs page (`/elements/<slug>`), preview, source tab, and copy button are all generated.
