import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// File paths
const USERS_FILE = path.join(DATA_DIR, "users.json")
const COURSES_FILE = path.join(DATA_DIR, "courses.json")
const LESSONS_FILE = path.join(DATA_DIR, "lessons.json")
const ENROLLMENTS_FILE = path.join(DATA_DIR, "enrollments.json")
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json")

// Helper functions to read/write JSON files
function readFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      writeFile(filePath, defaultValue)
      return defaultValue
    }
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return defaultValue
  }
}

function writeFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    throw error
  }
}

// User operations
export const users = {
  getAll: () => readFile(USERS_FILE, []),
  getById: (id: string) => users.getAll().find((u: any) => u.id === id),
  getByEmail: (email: string) => users.getAll().find((u: any) => u.email === email),
  create: (user: any) => {
    const users = readFile(USERS_FILE, [])
    users.push(user)
    writeFile(USERS_FILE, users)
    return user
  },
  update: (id: string, updates: any) => {
    const users = readFile(USERS_FILE, [])
    const index = users.findIndex((u: any) => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() }
      writeFile(USERS_FILE, users)
      return users[index]
    }
    return null
  },
}

// Course operations
export const courses = {
  getAll: () => readFile(COURSES_FILE, []),
  getById: (id: string) => courses.getAll().find((c: any) => c.id === id),
  getBySlug: (slug: string) => courses.getAll().find((c: any) => c.slug === slug),
  getByInstructor: (instructorId: string) => 
    courses.getAll().filter((c: any) => c.instructorId === instructorId),
  getPublished: () => courses.getAll().filter((c: any) => c.published),
  create: (course: any) => {
    const courses = readFile(COURSES_FILE, [])
    courses.push(course)
    writeFile(COURSES_FILE, courses)
    return course
  },
  update: (id: string, updates: any) => {
    const courses = readFile(COURSES_FILE, [])
    const index = courses.findIndex((c: any) => c.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updates, updatedAt: new Date().toISOString() }
      writeFile(COURSES_FILE, courses)
      return courses[index]
    }
    return null
  },
  delete: (id: string) => {
    const courses = readFile(COURSES_FILE, [])
    const filtered = courses.filter((c: any) => c.id !== id)
    writeFile(COURSES_FILE, filtered)
    return true
  },
  count: (filter?: (course: any) => boolean) => {
    const all = courses.getAll()
    return filter ? all.filter(filter).length : all.length
  },
}

// Lesson operations
export const lessons = {
  getAll: () => readFile(LESSONS_FILE, []),
  getById: (id: string) => lessons.getAll().find((l: any) => l.id === id),
  getByCourse: (courseId: string) => 
    lessons.getAll().filter((l: any) => l.courseId === courseId).sort((a: any, b: any) => a.order - b.order),
  create: (lesson: any) => {
    const lessons = readFile(LESSONS_FILE, [])
    lessons.push(lesson)
    writeFile(LESSONS_FILE, lessons)
    return lesson
  },
  update: (id: string, updates: any) => {
    const lessons = readFile(LESSONS_FILE, [])
    const index = lessons.findIndex((l: any) => l.id === id)
    if (index !== -1) {
      lessons[index] = { ...lessons[index], ...updates, updatedAt: new Date().toISOString() }
      writeFile(LESSONS_FILE, lessons)
      return lessons[index]
    }
    return null
  },
  delete: (id: string) => {
    const lessons = readFile(LESSONS_FILE, [])
    const filtered = lessons.filter((l: any) => l.id !== id)
    writeFile(LESSONS_FILE, filtered)
    return true
  },
  deleteByCourse: (courseId: string) => {
    const lessons = readFile(LESSONS_FILE, [])
    const filtered = lessons.filter((l: any) => l.courseId !== courseId)
    writeFile(LESSONS_FILE, filtered)
    return true
  },
}

// Enrollment operations
export const enrollments = {
  getAll: () => readFile(ENROLLMENTS_FILE, []),
  getById: (id: string) => enrollments.getAll().find((e: any) => e.id === id),
  getByStudent: (studentId: string) => 
    enrollments.getAll().filter((e: any) => e.studentId === studentId),
  getByCourse: (courseId: string) => 
    enrollments.getAll().filter((e: any) => e.courseId === courseId),
  getByStudentAndCourse: (studentId: string, courseId: string) =>
    enrollments.getAll().find((e: any) => e.studentId === studentId && e.courseId === courseId),
  create: (enrollment: any) => {
    const enrollments = readFile(ENROLLMENTS_FILE, [])
    enrollments.push(enrollment)
    writeFile(ENROLLMENTS_FILE, enrollments)
    return enrollment
  },
  update: (id: string, updates: any) => {
    const enrollments = readFile(ENROLLMENTS_FILE, [])
    const index = enrollments.findIndex((e: any) => e.id === id)
    if (index !== -1) {
      enrollments[index] = { ...enrollments[index], ...updates, updatedAt: new Date().toISOString() }
      writeFile(ENROLLMENTS_FILE, enrollments)
      return enrollments[index]
    }
    return null
  },
  count: (filter?: (enrollment: any) => boolean) => {
    const all = enrollments.getAll()
    return filter ? all.filter(filter).length : all.length
  },
}

// Review operations
export const reviews = {
  getAll: () => readFile(REVIEWS_FILE, []),
  getById: (id: string) => reviews.getAll().find((r: any) => r.id === id),
  getByCourse: (courseId: string) => 
    reviews.getAll().filter((r: any) => r.courseId === courseId),
  getByUser: (userId: string) => 
    reviews.getAll().filter((r: any) => r.userId === userId),
  create: (review: any) => {
    const reviews = readFile(REVIEWS_FILE, [])
    reviews.push(review)
    writeFile(REVIEWS_FILE, reviews)
    return review
  },
  update: (id: string, updates: any) => {
    const reviews = readFile(REVIEWS_FILE, [])
    const index = reviews.findIndex((r: any) => r.id === id)
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...updates, updatedAt: new Date().toISOString() }
      writeFile(REVIEWS_FILE, reviews)
      return reviews[index]
    }
    return null
  },
  delete: (id: string) => {
    const reviews = readFile(REVIEWS_FILE, [])
    const filtered = reviews.filter((r: any) => r.id !== id)
    writeFile(REVIEWS_FILE, filtered)
    return true
  },
  count: (filter?: (review: any) => boolean) => {
    const all = reviews.getAll()
    return filter ? all.filter(filter).length : all.length
  },
}

// Helper function to generate IDs (similar to cuid)
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export { generateId }

