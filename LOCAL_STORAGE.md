# Local JSON Storage System

CourseX LMS now uses **local JSON file storage** instead of a database. All data is stored in the `/data` directory as JSON files.

## 📁 Data Storage

All data is stored in the `/data` directory:
- `users.json` - User accounts (students, instructors, admins)
- `courses.json` - Course information
- `lessons.json` - Lesson content for courses
- `enrollments.json` - Student enrollments and progress
- `reviews.json` - Course reviews and ratings

## 🚀 Getting Started

1. **Seed Sample Data:**
   ```bash
   npm run db:seed
   ```

   This creates:
   - 3 instructor accounts
   - 2 student accounts
   - 6 courses with lessons
   - Sample enrollments
   - Sample reviews

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## 👤 Sample Accounts

After running the seed script, you can log in with:

**Instructors:**
- `sarah@example.com` / `password123`
- `michael@example.com` / `password123`
- `emily@example.com` / `password123`

**Students:**
- `john@example.com` / `password123`
- `jane@example.com` / `password123`

## 📊 Sample Courses

The seed script creates 6 courses:
1. **Complete Web Development Bootcamp** - Beginner Web Development
2. **Python for Data Science and Machine Learning** - Intermediate Data Science
3. **UI/UX Design Masterclass** - Beginner Design
4. **React Native Mobile App Development** - Intermediate Mobile Development
5. **Digital Marketing Strategy** - Beginner Business
6. **Photography Masterclass** - Beginner Photography

## 🔧 How It Works

The system uses a Prisma-like interface (`lib/local-db.ts`) that wraps JSON file operations:
- All Prisma query patterns are supported
- Data is automatically saved to JSON files
- No database setup required
- Works offline
- Perfect for development and testing

## 📝 Data Persistence

- Data persists between server restarts
- All changes are immediately saved to JSON files
- Files are gitignored (see `.gitignore`) to prevent committing user data

## ⚠️ Important Notes

- **Not for Production:** This local storage system is designed for development and testing
- **Single Server:** Data is stored on the file system, so it only works on a single server instance
- **No Concurrent Safety:** File operations are not atomic, so concurrent writes may cause issues
- **Backup Recommended:** For important data, regularly backup the `/data` directory

## 🗑️ Reset Data

To reset all data and start fresh:
```bash
rm -rf data/*.json
npm run db:seed
```

## 🔄 Migration from Database

If you previously used Prisma with a database:
1. The system automatically uses local storage now
2. No database connection required
3. All Prisma queries work the same way
4. Simply run `npm run db:seed` to populate with sample data

