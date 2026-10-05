# ✦ Murmur — Cinematic UI/UX Component Gallery

> **Note:** This project is created purely as a **UI/UX design showcase and component gallery**. It demonstrates modern web aesthetics, editorial layout design, micro-interactions, dark mode color science, and cinematic typography in React & Next.js.

---

## 🎨 Design Philosophy & UX Highlights

**Murmur** explores an anonymous, living wall of one-liners with a dark editorial aesthetic.

- **Cinematic Typography**: Pairs high-contrast serif headlines (*Instrument Serif*) with technical mono captions (*IBM Plex Mono*) and geometric body type (*Space Grotesk*).
- **Dark Mode Color Palette**: Built with deep charcoal backgrounds (`#0B0B0C`), subtle grid hairlines (`rgba(255, 255, 255, 0.08)`), and an ember accent glow (`#FF5A1D`).
- **Interactive UI Components**:
  - **Echo Button**: A subtle micro-interaction component for upvoting lines with real-time state transitions and pulse feedback.
  - **Smooth Ticker / Marquee**: A continuous horizontal marquee showcasing active submissions.
  - **Scroll Reveal**: Entrance animations designed for storytelling layouts.
  - **Masonry Wall**: Responsive multi-column layout for displaying variable-length user cards.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database (Demo)**: Local zero-config SQLite (`better-sqlite3` + `drizzle-orm`)

---

## 🚀 Quick Start (Local Development)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
├── src/
│   ├── app/                # Next.js App Router pages & server actions
│   ├── components/         # UI Gallery Components (Wall, Echo, Marquee, Compose)
│   ├── db/                 # Local SQLite database & Drizzle ORM schema
│   └── lib/                # Helper utilities
├── sqlite.db               # Local zero-config SQLite database file
└── package.json
```
