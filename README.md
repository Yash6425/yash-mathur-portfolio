# Yash Mathur — Portfolio

**Live site:** https://yashmathur6425.netlify.app · **API:** https://yashmathur6425.netlify.app/api/projects

Personal resume and portfolio website for **Yash Mathur**, built with React, Vite, TypeScript, Tailwind CSS and Framer Motion. All content comes from `Yash_Mathur_Resume.pdf`.

## Quick start

Requires **Node.js 18+** (20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Project structure

```
public/
  Yash_Mathur_Resume.pdf     ← the real resume (served at /Yash_Mathur_Resume.pdf)
  favicon.svg
  images/                    ← put profile.jpg here
  certificates/              ← put certificate files here
src/
  components/                ← Navbar, Modal, ProfilePhoto, CertificateMedia, ResumeLinks, …
  sections/                  ← Hero, About, Skills, Projects, Certificates, Education, Achievements, Contact
  data/
    profile.ts               ← name, links, education, achievements
    skills.ts
    projects.ts
    certificates.ts
  hooks/                     ← active section, asset checks, toast
  App.tsx · main.tsx · index.css
```

## Backend & database (full stack)

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS (Vite) |
| Backend | Node.js + Express REST API, running as a Netlify Function (`netlify/functions/api.mjs`) |
| Database | MongoDB Atlas (database `portfolio`, collections `projects`, `certificates`, `messages`) |
| Hosting | Netlify: https://yashmathur6425.netlify.app |

**API endpoints**

| Method | URL | What it does |
|---|---|---|
| GET | `/api/health` | Database status and record counts |
| GET | `/api/projects` | Projects stored in MongoDB |
| GET | `/api/certificates` | Certificates stored in MongoDB |
| POST | `/api/contact` | Validates a contact message and saves it in MongoDB |

- The first time the API runs, it copies `server/seed-data.mjs` into the empty collections. After that, edit data in MongoDB Atlas → Browse Collections.
- The frontend loads projects and certificates from the API and shows a "Live from MongoDB" label. If the API is unreachable, it falls back to the built-in data so the site never breaks.
- The MongoDB connection string is stored only as the `MONGODB_URI` environment variable in Netlify, never in the code.
- Run the API tests with `npm run test:api`.

**Deploy (keeps the same URL)**
```
npx netlify-cli login
npx netlify-cli link        # choose the existing site "yashmathur6425"
npx netlify-cli env:set MONGODB_URI "mongodb+srv://..."
npm run deploy
```

## Add your profile photo

1. Save a square photo (at least 600×600, under ~300 KB) as **`public/images/profile.jpg`**.
2. Reload. Until the file exists, the hero shows a clean "YM" placeholder (never a stock photo).

To use a different name or format (e.g. `.webp`), change `photoUrl` in `src/data/profile.ts`.

## Add your genuine certificates

All 19 certificates are already added: the images are in `public/certificates/` (with small previews in `public/certificates/thumbs/`), and their details are in `src/data/certificates.ts`. To add another one, follow the steps below.

1. Copy the file into `public/certificates/` (PDF, PNG, JPG/JPEG or WebP). Suggested names are in comments in the data file, e.g. `java-training.pdf`, `sql-oracle.pdf`, `linux-unhatched.pdf`.
2. Set `file` on the matching entry:

   ```ts
   { id: 'sql-oracle', title: 'Database Programming with SQL', issuer: 'Oracle',
     type: 'Course', categories: ['Databases'],
     file: '/certificates/sql-oracle.pdf',
     thumbnail: '/certificates/sql-oracle.webp',            // optional image preview for a PDF
     issueDate: 'Mar 2025',                                  // optional — copy from the certificate
     credentialId: 'ABC123',                                 // optional
     verifyUrl: 'https://…' },                               // optional official verification link
   ```

3. Only fill `issueDate`, `credentialId` and `verifyUrl` from the actual certificate.

Image certificates show as thumbnails automatically. PDFs show a PDF tile on the card (or the `thumbnail` image if set) and are embedded in the preview. Once a file exists, **View Full Certificate** and **Download Certificate** appear in the preview; if a path is wrong, the card falls back to the placeholder instead of a broken image.

## Add event photos

The **Leadership & Events** section is in `src/data/events.ts`. To show photos:

1. Put the photos in `public/events/`, e.g. `scat-sports-league-2025.jpg`.
2. Add them to that event's line: `photos: ['/events/scat-sports-league-2025.jpg']`.

Until a photo is added, each card shows an illustrated header. To add a new event, copy one entry and change its details.

## Add project links

In `src/data/projects.ts`, set `repoUrl` when a repository is public and `liveUrl` only if a real deployment exists. Without `repoUrl`, the card links to your GitHub profile (labelled "GitHub Profile"). An optional `image` replaces the illustrated thumbnail with a real screenshot.

## Contact form (optional backend)

Without configuration, the form validates input and opens the visitor's email app with the message pre-filled, addressed to ymathur6425@gmail.com.

To deliver messages straight to your inbox:

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint URL.
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx`.
3. On your host, add the same variable in the project's environment settings and redeploy.

The endpoint is a public URL, not a secret. The success message appears only after the service confirms the submission.

## Deploy

The site is static. `npm run build` outputs `dist/`, which contains the resume PDF and everything in `public/`.

**Vercel:** push the folder to a GitHub repo, then on vercel.com choose *Add New → Project*, import the repo, and keep the detected Vite settings (build `npm run build`, output `dist`).

**Netlify:** *Add new site → Import from Git*, build command `npm run build`, publish directory `dist`. You can also drag the `dist` folder onto app.netlify.com/drop.

**GitHub Pages:** for a `username.github.io` repo, deploy `dist/` as is. For a project repo (`username.github.io/repo/`), add `base: '/repo/'` to `vite.config.ts` and change the leading `/` paths in the data files to use `import.meta.env.BASE_URL`.

After deploying, open `https://your-site/Yash_Mathur_Resume.pdf` to confirm the resume is served.

## Functionality checklist

- [x] Sticky navbar: smooth scrolling, active-section highlight, mobile hamburger menu (Esc closes), Download Resume button
- [x] Hero: greeting, name, headline, rotating roles, intro, Explore My Work / Download Resume / View Resume, GitHub & LinkedIn
- [x] Profile photo card: animated gradient border, floating effect, drop-in `profile.jpg`, placeholder fallback
- [x] About, Skills (resume skills only, no percentages), Education timeline, Achievements & Activities
- [x] Projects: illustrated thumbnails, tech tags, detail modal, no invented repo or demo links
- [x] Certifications & Workshops: 14 entries, search, 7 category filters with counts, preview modal, next/previous (buttons and arrow keys), PDF/PNG/JPG/WebP support, download and verify buttons only when real data exists, graceful missing-file handling
- [x] Resume: served from `public/`, downloads as `Yash_Mathur_Resume.pdf`, opens in a new tab, friendly message if the file is missing
- [x] Contact: clickable email/LinkedIn/GitHub, validated form with honest status messages
- [x] Animations: entrance, scroll reveals, hover effects, modal transitions, back-to-top; respects "reduce motion"
- [x] Responsive with no horizontal overflow (tested at 360, 390, 768 and 1366 px), semantic HTML, ARIA labels, keyboard-accessible modals, SEO meta and favicon

Note: until `public/images/profile.jpg` is added, the browser console logs a single 404 for that image. This is expected and disappears once the photo is in place.
