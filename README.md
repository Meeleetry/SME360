# SME360 AI - All-In-One Enterprise SME Management Platform

SME360 AI is a modern SaaS web application designed for small and medium enterprises (SMEs) to streamline financial management, operations, customer relations, compliance, payroll, funding, and AI advisory in a unified dashboard.

---

## 🚀 Features

- **Dashboard**: Live financial KPIs, Revenue/Expense trends, Customer count, Low stock alerts, Recent Invoices & Customers.
- **AI Business Advisor**: Integrated with Gemini 3.6 Flash for CFO-level insights, tax advice, cash flow optimization, and prompt templates.
- **CRM Module**: Full customer management, lead tracking, total spend analytics, and contact directory.
- **Accounting & Financials**: Real-time profit & loss calculations, expense tracking, income logging, and category distribution.
- **Inventory & Stock**: SKU tracking, reorder point thresholds, price/cost margin calculator, and stock level adjustment.
- **Invoicing System**: Professional invoice generator, line items calculator, PDF/Print preview modal, and status tracking (Paid, Pending, Overdue).
- **Payroll Management**: Staff roster, salary and tax deduction calculations, and automated monthly payroll run execution.
- **Compliance Hub**: Regulatory deadlines (Tax, ESG, Labor, Audit), status scorecards, and action items.
- **Funding Hub**: SME Grants, Low-interest Loans, Equity matching, and application status tracker.
- **B2B Marketplace**: Verified vendor directory for legal, marketing, logistics, and IT services.
- **Auth & Settings**: JWT authentication, company profile configuration, dark/light theme toggle, and data export.

---

## 🛠️ Tech Stack

- **Frontend**: React.js 19, Tailwind CSS 4, Lucide React Icons, Recharts, Motion
- **Backend**: Node.js, Express.js
- **AI Integration**: `@google/genai` (Gemini 3.6 Flash model)
- **Database / ORM**: Prisma ORM, PostgreSQL (with in-memory engine fallback for instant local run)
- **Auth**: JWT Authentication

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma       # Prisma Database Schema
│   ├── seed.ts             # Database Seeding Script
│   └── migrations/
│       └── init.sql        # Initial SQL Migration
├── src/
│   ├── components/         # Reusable UI Components & Modals
│   ├── pages/              # SaaS App Pages & Core Modules
│   ├── data/               # Initial Data Seed Engine
│   ├── services/           # Frontend API Clients & Services
│   ├── types.ts            # Shared TypeScript Interfaces
│   ├── App.tsx             # Main React Routing & Layout Context
│   └── main.tsx            # React DOM Entrypoint
├── server.ts               # Express Backend Server & Gemini API Routes
├── package.json            # Project Dependencies & Scripts
├── .env.example            # Environment Variable Declarations
└── README.md               # Quick Start Documentation
```

---

## ⚙️ Local Installation & Running Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/sme360-ai.git
cd sme360-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and configure your keys:
```env
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="sme360_jwt_secret_key"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sme360?schema=public"
```

### 3. Run Database Migrations (Optional for PostgreSQL)
If using Prisma with PostgreSQL:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Start the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📤 Uploading to GitHub

```bash
git init
git add .
git commit -m "Initial commit - SME360 AI SaaS MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sme360-ai.git
git push -u origin main
```
