# CourseX - Learning Management System

<div align="center">
  <h3>A modern, full-featured Learning Management System built with Next.js 15, TypeScript, and Tailwind CSS</h3>
  <p>Designed for scalability, maintainability, and an exceptional developer experience</p>
</div>

## ✨ Features

### 🎓 For Students
- Browse and search courses with advanced filtering
- Filter by category, difficulty, and sort by rating/popularity
- Free course enrollment (no payment required)
- Interactive course player with video lessons
- Track learning progress with detailed analytics
- Submit reviews and ratings for enrolled courses
- Responsive design for all devices

### 👨‍🏫 For Instructors
- Create and manage courses with rich content
- Build comprehensive curriculum with multiple lessons
- Add video URLs and resources to lessons
- Publish/unpublish courses with one click
- View detailed analytics (enrollments, reviews, ratings)
- Export course data (CSV)
- Dashboard with comprehensive course statistics

### 🏢 Platform Features
- Role-based authentication (Student/Instructor)
- Google OAuth + Email/Password login
- Beautiful, modern UI with Framer Motion animations
- Coursera-inspired course detail pages
- Auto-generated course slugs
- Local JSON storage (no database setup required)
- Progress tracking and completion certificates
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Local JSON Storage (Prisma-ready for PostgreSQL)
- **Authentication**: NextAuth.js (Google + Email/Password)
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod

## 📁 Project Structure

This codebase follows a **feature-based architecture** for optimal organization and scalability:

```
LMS/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Application routes
│   │   ├── auth/         # Authentication pages
│   │   ├── courses/      # Course pages
│   │   ├── dashboard/     # Dashboard pages
│   │   └── api/          # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
│
├── components/             # React components (organized by feature)
│   ├── landing/          # Landing page sections
│   ├── courses/           # Course components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   ├── shared/           # Shared components
│   └── ui/               # UI primitives
│
├── lib/                   # Utilities and libraries
│   ├── data/             # Data layer (local storage)
│   ├── auth.ts           # Authentication config
│   └── utils.ts          # Helper functions
│
├── types/                 # TypeScript types
├── data/                  # JSON data files
└── scripts/               # Utility scripts
```

📖 **For detailed structure documentation, see [STRUCTURE.md](./STRUCTURE.md)**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- (Optional) PostgreSQL for production

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd LMS
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional: For Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate a secret:
```bash
openssl rand -base64 32
```

4. **Seed the database**
```bash
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## 📝 Sample Accounts

After running the seed script, you can use these test accounts:

**Instructor:**
- Email: `suryanshu@coursex.com` / Password: `password123`

**Students:**
- Email: `john@example.com` / Password: `password123`
- Email: `jane@example.com` / Password: `password123`

## 🎨 Design System

CourseX uses a modern, clean design system:

- **Primary Color**: Blue (#2563EB)
- **Typography**: Inter font family
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Custom components built on Radix UI primitives
- **Animations**: Smooth Framer Motion transitions

## 📚 Key Features

### Landing Page
- Hero section with call-to-action
- Statistics showcase
- Featured courses grid
- Interactive world map visualization
- Feature highlights section
- Student testimonials
- Call-to-action section

### Course Management
- Beautiful course detail pages (Coursera-inspired)
- Expandable lesson sections
- Video player integration
- Course reviews and ratings
- Enrollment tracking
- Progress visualization

### Dashboard
- Student dashboard with enrolled courses
- Instructor dashboard with analytics
- Course creation and editing
- Export functionality
- Progress tracking

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed local database
```

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@radix-ui/*` - Accessible UI primitives

### Data & Auth
- `next-auth` - Authentication
- `bcryptjs` - Password hashing
- `zod` - Schema validation

### Forms & State
- `react-hook-form` - Form handling
- `zustand` - State management (optional)

## 🏗️ Architecture Highlights

### Feature-Based Organization
Components are organized by feature/domain for better maintainability:
- `components/landing/` - All landing page sections
- `components/courses/` - All course-related components
- `components/dashboard/` - Dashboard-specific components

### Barrel Exports
Each feature folder has an `index.ts` for clean imports:
```typescript
import { CourseCard, EnrollButton } from "@/components/courses"
```

### Data Layer
Centralized data access in `lib/data/`:
- `store.ts` - Low-level CRUD operations
- `local-db.ts` - Prisma-like interface

### Type Safety
Types organized by domain in `types/` directory

## 📖 Documentation

- [STRUCTURE.md](./STRUCTURE.md) - Detailed project structure
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database setup guide
- [LOCAL_STORAGE.md](./LOCAL_STORAGE.md) - Local storage documentation
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Environment Variables:**
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production domain)
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and building your own LMS!

## 🙏 Acknowledgments

- Design inspiration from Coursera
- UI components based on shadcn/ui
- Built with Next.js and TypeScript

---

**Made with ❤️ by the CourseX Team**