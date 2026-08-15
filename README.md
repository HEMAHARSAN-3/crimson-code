# Hema Harsan R — Portfolio

A modern, recruiter-focused portfolio website showcasing work in **Data Analytics**, **Machine Learning**, **Deep Learning**, and **Computer Vision**.

**Live site:** [hemaharsan.netlify.app](https://hemaharsan.netlify.app)

---

## Overview

This portfolio presents Hema Harsan R's background as an AI & Data Science graduate — combining applied project work, technical skills, experience, and education in a clean, editorial interface designed for recruiters, hiring managers, and engineering teams.

The site highlights real projects, technical capabilities, and contact paths without filler content or inflated claims.

---

## Features

- **Responsive layout** — optimized for mobile, tablet, and desktop
- **Project showcase** — filterable case studies across AI/ML and Data Analytics
- **Dual resume profiles** — Data Analyst and AI/ML Engineer PDFs with in-browser viewing
- **Interactive skill matrix** — categorized technical stack with project deep-links
- **Experience & education timelines** — structured career and academic history
- **Contact form** — EmailJS-powered inquiry form with validation
- **Accessible UI** — semantic HTML, keyboard navigation, and reduced-motion support
- **Performance-focused** — lazy-loaded assets, GPU-friendly animations, and minimal bundle overhead

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | React 19, TypeScript |
| Routing & SSR | TanStack Start, TanStack Router |
| Styling | Tailwind CSS v4, CSS variables |
| UI | Radix UI, Lucide React |
| Animation | Motion (Framer Motion) |
| Forms | React Hook Form, Zod |
| Email | EmailJS |
| Build | Vite, Nitro |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm

### Installation

```bash
git clone <repository-url>
cd crimson-code-main
npm install
```

### Environment Variables

Copy the example file and add your EmailJS credentials for the contact form:

```bash
cp .env.example .env.local
```

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

### Development

```bash
npm run dev
```

The app runs locally at `http://localhost:8080` by default.

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Netlify

This project uses TanStack Start with Nitro's Netlify preset. Netlify is configured via `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node.js:** 22 (see `.nvmrc`)

Connect your GitHub repo in the [Netlify dashboard](https://app.netlify.com/) and deploy from `main`. Netlify runs SSR through `.netlify/functions-internal` automatically.

Set these environment variables in Netlify (**Site settings → Environment variables**) for the contact form:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

> **Note:** `packageManager` is set to npm so Netlify uses `npm install` with `package-lock.json`, even though `bun.lock` is also present for Lovable.

---

## Project Structure

```
src/
├── assets/              # Images, logos, resume PDFs
├── components/
│   └── portfolio/       # Page sections (Hero, Projects, Skills, etc.)
├── data/                # Portfolio content and resume metadata
├── lib/                 # Utilities (scroll, email, preferences)
├── routes/              # TanStack file-based routes
└── styles.css           # Global styles and design tokens
```

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## Contact

**Hema Harsan R**  
AI & Data Science Graduate · Data Analytics · Machine Learning · Computer Vision

- **Email:** [hemaharsan3@gmail.com](mailto:hemaharsan3@gmail.com)
- **GitHub:** [github.com/HEMAHARSAN-3](https://github.com/HEMAHARSAN-3)
- **LinkedIn:** [linkedin.com/in/hema-harsan-r](https://www.linkedin.com/in/hema-harsan-r/)

---

## License

This project is private and intended for personal portfolio use. All rights reserved © 2026 Hema Harsan R.
