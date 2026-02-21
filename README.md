# VC Intelligence

<p align="center">
  <a href="https://vc-intelligencein.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Vercel-black?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/Rajudotin/vc-intelligence">
    <img src="https://img.shields.io/badge/Repository-GitHub-black?style=for-the-badge" alt="GitHub Repository" />
  </a>
</p>

<p align="center">
  A production-ready venture capital discovery interface with live AI-powered enrichment.
</p>

---

## 🚀 Live Demo

**Live URL:** [https://vc-intelligencein.vercel.app](https://vc-intelligencein.vercel.app)

**GitHub Repository:** [https://github.com/Rajudotin/vc-intelligence](https://github.com/Rajudotin/vc-intelligence)

---

## 🎯 Overview

VC Intelligence is a modern venture discovery platform built with Next.js. It enables users to:

- Browse and filter companies
- View detailed company profiles
- Trigger live enrichment using server-side scraping
- Extract structured AI insights from public website data
- Save and manage companies in lists

This project demonstrates:

- Production-ready UI architecture
- Secure server-side API integration
- Clean state management
- Responsive SaaS dashboard design
- Proper environment variable handling
- Deployment on Vercel

---

## ✨ Core Features

### 📊 Companies Dashboard

- Search and filter companies
- Sortable table layout
- Pagination support
- Responsive design

### 🏢 Company Profile

- Detailed company overview
- Sector / Stage / Location information
- Score badge
- Save button (UI state)

### 🤖 Live AI Enrichment

- Scrapes public website content
- Parses HTML using Cheerio
- Sends structured content to OpenRouter
- Returns:
  - Summary
  - What they do
  - Keywords
  - Derived signals
  - Source metadata with timestamps
- Loading and error states
- Fully server-side execution
- API key never exposed to frontend

### 📋 Saved & Lists

- Save companies
- Create and manage lists
- Export list data (JSON / CSV)
- State persisted using localStorage

### 📱 Responsive Layout

- Desktop fixed sidebar
- Mobile slide-in sidebar
- Smooth transitions
- Clean SaaS UI structure

---

## 🛠 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend (API Route)

- Next.js Server Routes
- [Cheerio](https://cheerio.js.org/) (HTML parsing)
- [OpenRouter API](https://openrouter.ai/) (LLM enrichment)

### Deployment

- [Vercel](https://vercel.com)

---

## 🔐 Environment Variables

Create a file in the root directory:

```
.env.local
```

Add:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get a free API key from: [https://openrouter.ai](https://openrouter.ai)

> ⚠️ Never commit `.env.local` to GitHub.

---

## 🚀 Local Development

### 1️⃣ Clone the Repository

```
bash
git clone https://github.com/Rajudotin/vc-intelligence
cd vc-intelligence
```

### 2️⃣ Install Dependencies

```
bash
npm install
```

### 3️⃣ Add Environment Variable

Create `.env.local` and add your API key.

### 4️⃣ Run Development Server

```
bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🏗 Production Build

To test production locally:

```
bash
npm run build
npm start
```

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import the repository
4. Add environment variable:
   - `OPENROUTER_API_KEY`
5. Deploy

---

## 📡 API Documentation

### POST /api/enrich

Enriches a company using its public website.

#### Request

```
json
{
  "url": "https://example.com"
}
```

#### Response

```
json
{
  "summary": "...",
  "what_they_do": [],
  "keywords": [],
  "derived_signals": [],
  "sources": [
    {
      "url": "...",
      "scraped_at": "..."
    }
  ]
}
```

---

## 📁 Project Structure

```
vc-intelligence/
├── app/
│   ├── api/
│   │   └── enrich/
│   │       └── route.js
│   ├── companies/
│   │   ├── page.js
│   │   └── [id]/
│   │       └── page.js
│   ├── lists/
│   │   └── page.js
│   ├── saved/
│   │   └── page.js
│   ├── settings/
│   │   └── page.js
│   ├── test/
│   │   └── page.js
│   ├── data/
│   │   └── companies.js
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── providers.js
├── components/
│   ├── Badge.js
│   ├── CompaniesTable.js
│   ├── CompanyProfile.js
│   ├── DashboardLayout.js
│   ├── Navbar.js
│   ├── Pagination.js
│   ├── SearchInput.js
│   ├── Sidebar.js
│   └── TestFetch.js
├── hooks/
│   └── useCompanies.js
├── lib/
│   └── storage.js
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── utils/
│   ├── mockData.js
│   └── urlChecker.js
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
└── tailwind.config.js
```

---

## 🔒 Security Notes

- API key is stored in environment variables
- Enrichment runs server-side only
- No secrets exposed to client
- `.env.local` is excluded via `.gitignore`

---

## 📄 License

MIT License
