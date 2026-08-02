# YatraSewa - Production Deployment Guide

## 🚀 Overview
YatraSewa is a fullstack Next.js application. It is designed to be deployed on **Vercel** (for both Frontend and API) and connects to a **PostgreSQL** database.

## 🛠 Prerequisites
- Node.js 18+
- PostgreSQL Database (e.g., Supabase, Neon, or Render PostgreSQL)
- Vercel Account
- GitHub Repository

## 📦 Environment Variables
Create a `.env` file in production with the following keys:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
JWT_SECRET=your_super_secure_random_string
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 🚀 Deployment Steps

### 1. Database Setup
1. Create a PostgreSQL instance on **Render** or **Supabase**.
2. Get your `DATABASE_URL`.
3. Push the schema to your production database:
   ```bash
   npx drizzle-kit push
   ```

### 2. Vercel Deployment (Frontend + API)
1. Push your code to a **GitHub** repository.
2. Connect the repo to **Vercel**.
3. Add the Environment Variables in the Vercel dashboard.
4. Deployment will automatically handle the build and serve the app.

### 3. Backend on Render (Optional)
If you specifically want a separate backend on Render, you would need to migrate the logic from `src/app/api` to a standalone Express server. However, **Next.js API routes** (currently used) are already high-performance and scalable on Vercel's edge network.

## 🧪 Post-Deployment
1. Visit `https://your-domain.vercel.app/api/seed` **once** to populate initial admin and company accounts.
2. Log in with the default credentials:
   - **Admin**: `laxmisah988@gmail.com` / `Laxmi@123`
   - **Company**: `agent.laxmisah988@gmail.com` / `Agent@123`
   - **Customer**: `user.laxmisah988@gmail.com` / `User@123`

## 🛡 Security
- Ensure `JWT_SECRET` is long and complex.
- Use `SSL` for database connections (`?sslmode=require`).
- All API routes are protected by role-based middleware.
