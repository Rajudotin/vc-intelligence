🚀 VC Intelligence

A production-ready venture capital discovery interface with live AI-powered enrichment.

🔗 Live Links

Live Demo:https://vc-intelligencein.vercel.app


GitHub Repository:https://github.com/Rajudotin/vc-intelligence

🎯 Overview

VC Intelligence is a modern venture discovery platform built with Next.js.

It enables users to:

Browse and filter companies

View detailed company profiles

Trigger live enrichment using server-side scraping

Extract structured AI insights from public website data

Save and manage companies in lists

This project demonstrates:

Production-ready UI architecture

Secure server-side API integration

Clean state management

Responsive SaaS dashboard design

Proper environment variable handling

Deployment on Vercel

✨ Core Features
📊 Companies Dashboard

Search and filter companies

Sortable table layout

Pagination support

Responsive design

🏢 Company Profile

Detailed company overview

Sector / Stage / Location information

Score badge

Save button (UI state)

Live AI Enrichment

🤖 Live AI Enrichment

Scrapes public website content

Parses HTML using Cheerio

Sends structured content to OpenRouter

Returns:

Summary

What they do

Keywords

Derived signals

Source metadata with timestamps

Loading and error states

Fully server-side execution

API key never exposed to frontend

📋 Saved & Lists

Save companies

Create and manage lists

Export list data (JSON / CSV)

State persisted using localStorage

📱 Responsive Layout

Desktop fixed sidebar

Mobile slide-in sidebar

Smooth transitions

Clean SaaS UI structure

🛠 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Lucide Icons

Backend (API Route)

Next.js Server Routes

Cheerio (HTML parsing)

OpenRouter API (LLM enrichment)

Deployment

Vercel

🔐 Environment Variables

Create a file in the root directory:

.env.local

Add:

OPENROUTER_API_KEY=your_openrouter_api_key_here

Get a free API key from:

https://openrouter.ai

⚠ Never commit .env.local to GitHub.

🚀 Local Development
1️⃣ Clone the Repository
git clone https://github.com/Rajudotin/vc-intelligence
cd vc-intelligence
2️⃣ Install Dependencies
npm install
3️⃣ Add Environment Variable

Create .env.local and add your API key.

4️⃣ Run Development Server
npm run dev

Open:

http://localhost:3000
🏗 Production Build

To test production locally:

npm run build
npm start
🚀 Deployment (Vercel)

Push code to GitHub

Go to https://vercel.com

Import the repository

Add environment variable:

OPENROUTER_API_KEY

Deploy

📡 API Documentation
POST /api/enrich

Enriches a company using its public website.

Request
{
  "url": "https://example.com"
}
Response
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
📁 Project Structure
app/
  api/enrich/route.js
  companies/
  company/[id]/
  lists/
  saved/
  layout.js
  page.js
components/
  Sidebar.js
  Navbar.js
  CompaniesTable.js
  CompanyProfile.js
  Pagination.js
public/
.env.local (ignored)
🔒 Security Notes

API key is stored in environment variables

Enrichment runs server-side only

No secrets exposed to client

.env.local is excluded via .gitignore

📄 License

MIT License
