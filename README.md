# Ashwin SR — Portfolio

A React + Vite portfolio built in the same token-based design system used across
the QBall-style component gallery: locked light/dark themes, sage (`--color-signal`)
+ amber (`--color-highlight`) as the only two accent colors, Fira Code / Syne /
Instrument Serif / JetBrains Mono for type.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Structure

```
src/
  styles/tokens.css         # design tokens (color, type, spacing, radii, motion)
  styles/global.css         # element + utility styles built from tokens
  context/ThemeContext.jsx  # light/dark toggle, persisted to localStorage
  data/profile.json         # your summary, skills, experience, contact info — EDIT THIS, no code
  data/projects.json        # every case study, written against the 15-parameter framework — EDIT THIS, no code
  utils/projects.js         # thin helper that reads projects.json (getProjectBySlug, etc.)
  utils/experience.js        # computes "X Years Y Months" from profile.json's experienceStartDate, live, on every load
  components/               # Header, Footer, ProjectCard, ThemeToggle
  pages/Home.jsx             # hero, stats, project grid, skills, experience, contact
  pages/ProjectDetail.jsx    # dedicated /projects/:slug case-study page
```

### Content is data-only now

All portfolio content lives in two JSON files — no JavaScript to touch when you just want to update text:

- **`src/data/profile.json`** — name, contact info, skills, experience, education, certifications,
  and the homepage stat strip. Update this whenever your info changes.
- **`src/data/projects.json`** — an array of project objects, one per case study, each with all
  15 parameters as fields. Add a new object with a new `slug` to add a project — no new files,
  components, or routes required; `/projects/:slug` renders whatever's in the array automatically.

### Project screenshots / gallery

Each project object in `projects.json` now has an `"images"` array:

```json
"images": [
  { "src": "/projects/warehouse-stock-take/1.svg", "alt": "Warehouse Stock Take — App screen 1" },
  { "src": "/projects/warehouse-stock-take/2.svg", "alt": "Warehouse Stock Take — App screen 2" }
]
```

Right now these point at **placeholder SVGs** (in `public/projects/<slug>/`) so the gallery works
out of the box. Replace them with real screenshots:

1. Drop your PNG/JPG screenshots into `public/projects/<slug>/` (any filenames).
2. Update the matching `images` array in `projects.json` to point at them, e.g.
   `"src": "/projects/warehouse-stock-take/dashboard.png"`.
3. Write a real `alt` for each — it's shown as the caption in the lightbox too.

The gallery (`components/ProjectGallery.jsx`) renders a responsive grid on desktop/tablet that
becomes a swipeable, scroll-snap carousel on phones. Clicking any image opens a full-screen
lightbox with prev/next arrows, arrow-key and `Esc` support, and a caption — no extra config needed.

### Experience is calculated automatically

`profile.json` stores only `"experienceStartDate": "2023-09-01"` — not a years/months figure.
`utils/experience.js` computes the elapsed time between that date and *today* every time the
site loads, so the hero stat ("2 Years 10 Months" today, "2 Years 11 Months" next month, etc.)
always stays correct with zero code or JSON edits. To adjust your start date, change only that
one field.

Routes:
- `/` — the 2–3 minute recruiter scan: hero, stat strip, project grid, skills, experience, contact.
- `/projects/<slug>` — one dedicated case-study page per project (e.g. `/projects/warehouse-stock-take`),
  rendering the full 15-parameter breakdown (business problem → decision-making → tech stack).

## To customize

1. **Your info** — edit `src/data/profile.js` (email, phone, LinkedIn URL, skills, experience).
   The LinkedIn URL is currently a placeholder (`linkedin.com/in/ashwin-sr`) — update it to your real profile.
2. **Projects** — edit `src/data/projects.js`. Each project is one object with all 15 fields;
   add a new object (with a new `slug`) to add a project — no new files or routes needed,
   `ProjectDetail.jsx` renders any project from this data automatically.
3. **Résumé download** — replace `public/Ashwin-SR-Resume.pdf` with your latest PDF (same filename,
   or update `profile.resumeFile`).
4. **Colors/fonts** — everything is driven by `src/styles/tokens.css`; change the two `--color-signal`
   / `--color-highlight` values (and their light/dark pairs) to retheme the whole site.

## Notes on the project write-ups

The 15-parameter case studies were drafted from your resume's stated facts (the 60%, 70%, and
8+ hrs/week figures, the 5-entity tax automation, DataWedge scanning, etc.). Fields without a
number in the original resume (exact user counts, precise DB schema names) were written as
accurate, defensible generalizations rather than invented statistics — go through `data/projects.js`
and tighten any detail you can make more specific (real user counts, record volumes, team sizes)
since those numbers are exactly what make a case study land with a recruiter.
