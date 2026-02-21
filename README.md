# VC Intelligence Platform

An AI-powered venture capital discovery platform with live enrichment capabilities. Built for the Vibe Coding Take-Home assignment.

## 🚀 Live Demo

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vc-intelligence.vercel.app)

**Live URL:** https://vc-intelligence.vercel.app

## 📋 Features Implemented

### Core Requirements ✓
- ✅ **Sidebar Navigation** - Collapsible with professional icons
- ✅ **Global Search** - Search companies with keyboard shortcut (⌘K)
- ✅ **/companies** - Filterable, sortable table with pagination
- ✅ **/companies/[id]** - Detailed profile with AI enrichment
- ✅ **/lists** - Create, edit, export lists (CSV/JSON)
- ✅ **/saved** - Save and re-run searches
- ✅ **Live Enrichment** - Real website scraping with AI analysis

### Premium Features
- ✅ **Responsive Design** - Perfect on mobile, tablet, desktop
- ✅ **Keyboard Shortcuts** - ⌘K for search, ESC to close
- ✅ **Bulk Actions** - Select multiple companies
- ✅ **Export Options** - JSON and CSV formats
- ✅ **Local Storage** - Persists saved items and preferences
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - Graceful fallbacks and retry options

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenRouter (Llama 3)
- **Scraping**: Cheerio
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenRouter API key (get at [openrouter.ai](https://openrouter.ai))

### Setup Instructions

1. **Clone the repository**
   ```bash
   [git clone https://github.com/Rajudotin/vc-intelligence.git]
   cd vc-intelligence
