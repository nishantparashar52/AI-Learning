
# Real-World AI Learning (Schools) — 

# 🧠 Real‑World AI Learning Platform (POC → Production)

AI‑powered learning platform with interactive **concept cards**, **practice questions**, **assignments**, and auto‑scoring — built to be *school‑ready*.

---

## 📌 Overview

This full‑stack application enables teachers to seed concepts, auto‑generate innovative questions (via AI or mock generation), assign homework, and collect student submissions with analytics.

**Key Features**
- Concept cards with structured sections
- Practice: MCQs and other formats
- Teacher dashboard to create assignments
- Students attempt and submit online
- Auto grading + score/time reporting
- Backend microservices for content, AI question generation, assignments, submissions
- MongoDB Atlas for persistent storage

---

## 🚀 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (App Router)
- React + TailwindCSS
- Deployed on **Vercel**

**Backend:**
- Node.js + Express
- Mongoose ODM
- Microservice pattern
- Deployed on **Render**

**Database:**
- MongoDB Atlas (Cloud hosted)

---

## 🏗 Architecture Diagram


This PoC includes a **Next.js** frontend and an **Express + Mongoose** backend with **seed data** for 5 Math concepts.

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas (or local MongoDB). Create a connection string and set it in `.env`.

### Backend (API)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env to set MONGODB_URI
npm run seed:all
npm run dev
```
Backend runs on **http://localhost:4000**.

### Frontend (Web)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:3000**.

## Default Demo Flow
1. Run backend and frontend.
2. In the frontend, pick a concept (e.g., Percentage) and start learning.
3. Teacher dashboard shows demo assignments and a simple heatmap.

## Structure
```
/poc-ai-learning
  /backend
  /frontend
  /packages
```

## Notes
- This PoC focuses on content & flow; billing/Postgres and WhatsApp notifications are scoped for later phases.
- All content is **EN** and localized to Indian contexts (₹ currency, local examples).
