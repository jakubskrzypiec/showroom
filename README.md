# Stratos — scroll-driven showroom

A concept site for a fictional orbital design studio. Scroll launches the camera from a twilight sky,
through cloud layers and the stratosphere, past the Kármán line into orbit, where a rotating Earth
lands behind the hero. After that, the content scrolls over the planet with glows that keep moving.

**Stack:** Vite · Three.js (custom GLSL shaders, bloom) · GSAP ScrollTrigger · Lenis

## Run

```bash
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/`).

## Scroll scenario

| Scroll | Scene |
| --- | --- |
| 0–12% | Inside the studio in Katowice: desk, monitor, then out through the window — "Look up." |
| 12–40% | Down the boulevard and up through 5 cloud layers, speed streaks, mist punch-through, 12 km → 50 km captions |
| 40–60% | Breakout into black, looking down at the curve of Earth (Poland at the top) — "100 km" |
| 60–100% | Pull back to a full globe: city lights, orbit rings, satellites; hero copy reveals |
| After | Manifesto → capability cards → horizontal missions → counters → palette kit |
| Descent | Back down onto Katowice, along the boulevard and in through the studio window to the desk → CTA |

## Structure

- `src/scene.js` — the whole WebGL scene: sky dome, stars, clouds, streaks, Earth, atmosphere, rings, camera path
- `src/main.js` — Lenis, preloader, ScrollTrigger timelines, HUD, cursor, interactions
- `src/style.css` — layout and brand tokens (`#040811`, `#1B54FF`, `#83F9FF`, `#FEB122`)
- `src/city.js` — night-time Katowice (instanced blocks, traffic, arena) and the studio room
- `public/textures/` — 4K Earth maps from the three.js examples (NASA Blue Marble / Black Marble derived)

Brand palette follows the reference board; type is Inter Tight (swap for Neue Montreal if you have a licence).
`prefers-reduced-motion` disables smooth scroll and reveal animations.
