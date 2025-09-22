# Kiryl Portfolio (Next.js + Tailwind + Framer Motion)

A clean, animated portfolio tailored for a Senior Java/AWS engineer.

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- Recharts (synthetic CloudWatch-like chart)
- Netlify (with `@netlify/plugin-nextjs`)

## Local dev
```bash
npm i
npm run dev
```

## Deploy to Netlify (recommended)
1. Create a **new Git repo** and push this project (e.g., GitHub).
2. In Netlify, **Add new site → Import from Git**.
3. Select the repo. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment: leave defaults (Node 18+). Netlify auto-detects Next.js.
4. Ensure the plugin is enabled (it is via `netlify.toml`).

> Alternatively, use Netlify CLI:
```bash
npm i -g netlify-cli
netlify init
netlify deploy --build --prod
```

## Personalize
- Edit hero text in `components/Hero.tsx`
- Projects in `lib/projects.ts`
- Experience timeline in `components/Timeline.tsx`
- Contacts in `components/Contact.tsx`
- Styles in `app/globals.css` & Tailwind config
