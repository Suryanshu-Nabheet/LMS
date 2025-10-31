# CourseX - Learning Management System

A full-featured Learning Management System (LMS) platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL. CourseX allows instructors to create and publish courses while students can browse, enroll, and learn from these courses.

## 🚀 Features

### For Students
- Browse and search courses
- Filter by category, difficulty, and sort by rating/popularity
- Enroll in courses (free for MVP)
- Track learning progress
- Course player with video lessons
- Leave reviews and ratings for enrolled courses

### For Instructors
- Create and manage courses
- Build curriculum with multiple lessons
- Add video URLs and resources to lessons
- Publish/unpublish courses
- View analytics (enrollments, reviews, ratings)
- Dashboard with course statistics

### Platform Features
- Role-based authentication (Student/Instructor)
- Google OAuth + Email/Password login
- Responsive design with Tailwind CSS
- Modern UI with Framer Motion animations
- Course slug generation
- Progress tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google + Email/Password)
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (local or hosted like Supabase)
- Google OAuth credentials (optional, for Google login)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd LMS
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory. **IMPORTANT:** You need a real database connection string!

#### Quick Setup with Supabase (Recommended - Free):

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection string** (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password

```env
# Database - Use your Supabase connection string
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**For local PostgreSQL:** If you have PostgreSQL installed locally, create the database first:
```bash
createdb coursex
```
Then use: `DATABASE_URL="postgresql://postgres:your_password@localhost:5432/coursex?schema=public"`

**To generate `NEXTAUTH_SECRET`:**
```bash
openssl rand -base64 32
```

**📖 See `DATABASE_SETUP.md` for detailed setup instructions.**

### 4. Set up the database

```bash
# Push Prisma schema to database
npm run db:push

# Generate Prisma Client
npx prisma generate

# (Optional) Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
LMS/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── courses/           # Course pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts          # Seed script
└── types/                # TypeScript type definitions
```

## 🗄️ Database Schema

### Key Models

- **User**: Students and Instructors with role-based access
- **Course**: Course information with instructor relation
- **Lesson**: Individual lessons within a course
- **Enrollment**: Student enrollments with progress tracking
- **Review**: Course reviews and ratings

## 🔐 Authentication

The app supports two authentication methods:

1. **Email/Password**: Users can register with email and password
2. **Google OAuth**: Users can sign in with their Google account

Both methods support role selection during registration (Student or Instructor).

## 📝 Sample Accounts

After running the seed script, you can use these test accounts:

**Instructors:**
- Email: `instructor1@example.com` / Password: `password123`
- Email: `instructor2@example.com` / Password: `password123`

**Students:**
- Email: `student1@example.com` / Password: `password123`
- Email: `student2@example.com` / Password: `password123`

## 🎨 UI/UX Features

- Clean, modern design inspired by Coursera
- Responsive layout for all screen sizes
- Smooth animations with Framer Motion
- Accessible components with Radix UI
- Consistent color scheme:
  - Primary Blue: `#2563EB`
  - Dark Text: `#1E293B`
  - Light Background: `#F8FAFC`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Make sure to:
- Set up PostgreSQL database (e.g., Supabase, Neon, or Railway)
- Update `DATABASE_URL` in environment variables
- Configure `NEXTAUTH_URL` to your production domain

## 🔮 Future Enhancements

- Payment integration (Stripe)
- Video upload functionality
- Advanced analytics
- Discussion forums
- Certificates
- Email notifications
- Advanced search with filters
- Wishlist functionality
- Course recommendations

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript

