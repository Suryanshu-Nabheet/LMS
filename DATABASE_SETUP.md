# Database Setup Guide

## Option 1: Using Supabase (Recommended - Free & Easy)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Wait for the project to be created (takes ~2 minutes)
4. Go to **Settings** → **Database**
5. Find the **Connection String** section
6. Copy the **URI** connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
7. Replace `[YOUR-PASSWORD]` with your database password (set during project creation)

### Update your `.env` file:

Replace the `DATABASE_URL` with your Supabase connection string:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**Note:** If you forgot your database password, go to **Settings** → **Database** → **Reset Database Password**

---

## Option 2: Local PostgreSQL

### Install PostgreSQL:

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Or download from:** https://www.postgresql.org/download/

### Create Database:

```bash
# Create a database user (if needed)
createuser -s postgres

# Create the database
createdb coursex
```

### Update your `.env` file:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/coursex?schema=public"
```

Replace `your_password` with your PostgreSQL password.

---

## Option 3: Other Hosted Services

You can also use:
- **Neon** (https://neon.tech) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **Render** (https://render.com) - Free tier available

Just get the PostgreSQL connection string and update your `.env` file.

---

## After Setting Up Database:

1. Make sure your `.env` file has the correct `DATABASE_URL`
2. Run the following commands:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

---

## Verify Connection:

You can verify your connection works by running:

```bash
npx prisma db push
```

If successful, you should see:
```
✔ Your database is now in sync with your Prisma schema.
```

---

## Troubleshooting:

### Error: "User was denied access"
- Check your database credentials in `.env`
- Make sure the database user has proper permissions
- For Supabase: Make sure you're using the connection string from the Supabase dashboard

### Error: "Can't reach database server"
- Check if PostgreSQL is running (for local setup): `brew services list`
- Verify the host and port in your connection string
- Check firewall settings

### Error: "Database does not exist"
- Create the database first: `createdb coursex` (for local) or create it in your hosted service dashboard

