# KPI Tracker App

This project is a KPI Tracker built with Next.js, Prisma, and Tailwind CSS. The app allows recruiters and managers to track key performance indicators (KPIs) for job placements, recruiter performance, and other recruitment metrics.

## Features

- User authentication and role-based access control (Manager, Recruiter).
- KPI management: create, update, view, and delete KPIs.
- Peer comparison for recruiters.
- KPI export options (CSV and PDF).
- User profile updates (email, password).

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn UI components.
- **Backend**: Next.js API routes, Prisma (SQLite or Postgres).
- **Database**: Prisma ORM with SQLite (can switch to PostgreSQL).
- **Authentication**: Minimal auth with environment variables or session-based login.

## Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/kpi-tracker.git
