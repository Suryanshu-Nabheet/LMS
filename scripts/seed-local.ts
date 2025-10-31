import { users, courses, lessons, enrollments, reviews, generateId } from "../lib/data/store"
import bcrypt from "bcryptjs"

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

async function seed() {
  console.log("🌱 Seeding local database...")

  // Clear existing data
  console.log("Clearing existing data...")
  require("fs").writeFileSync(require("path").join(process.cwd(), "data/users.json"), "[]")
  require("fs").writeFileSync(require("path").join(process.cwd(), "data/courses.json"), "[]")
  require("fs").writeFileSync(require("path").join(process.cwd(), "data/lessons.json"), "[]")
  require("fs").writeFileSync(require("path").join(process.cwd(), "data/enrollments.json"), "[]")
  require("fs").writeFileSync(require("path").join(process.cwd(), "data/reviews.json"), "[]")

  // Create instructor users
  console.log("Creating instructors...")
  const instructor1 = users.create({
    id: generateId(),
    name: "Suryanshu Nabheet",
    email: "suryanshu@coursex.com",
    password: await hashPassword("password123"),
    role: "INSTRUCTOR",
    image: "/Suryanshu_Nabheet.png",
    emailVerified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const instructor2 = users.create({
    id: generateId(),
    name: "Suryanshu Nabheet",
    email: "suryanshu3@coursex.com",
    password: await hashPassword("password123"),
    role: "INSTRUCTOR",
    image: "/Suryanshu_Nabheet.png",
    emailVerified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const instructor3 = users.create({
    id: generateId(),
    name: "Suryanshu Nabheet",
    email: "suryanshu2@coursex.com",
    password: await hashPassword("password123"),
    role: "INSTRUCTOR",
    image: "/Suryanshu_Nabheet.png",
    emailVerified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Create student users
  console.log("Creating students...")
  const student1 = users.create({
    id: generateId(),
    name: "John Doe",
    email: "john@example.com",
    password: await hashPassword("password123"),
    role: "STUDENT",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    emailVerified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const student2 = users.create({
    id: generateId(),
    name: "Jane Smith",
    email: "jane@example.com",
    password: await hashPassword("password123"),
    role: "STUDENT",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    emailVerified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Create courses
  console.log("Creating courses...")

  // Course 1: Web Development
  const course1 = courses.create({
    id: generateId(),
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and land your dream job as a web developer.",
    category: "Web Development",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Beginner",
    language: "English",
    price: 89.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 1 Lessons
  lessons.create({
    id: generateId(),
    title: "Introduction to HTML",
    description: "Learn the basics of HTML structure and tags",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course1.id,
    resources: ["https://developer.mozilla.org/en-US/docs/Web/HTML"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "CSS Fundamentals",
    description: "Master CSS styling and layouts",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 2,
    courseId: course1.id,
    resources: ["https://developer.mozilla.org/en-US/docs/Web/CSS"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "JavaScript Basics",
    description: "Learn JavaScript programming fundamentals",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 3,
    courseId: course1.id,
    resources: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 2: Data Science
  const course2 = courses.create({
    id: generateId(),
    title: "Python for Data Science and Machine Learning",
    slug: "python-data-science-machine-learning",
    description: "Learn Python, pandas, NumPy, matplotlib, scikit-learn, and TensorFlow. Build ML models from scratch.",
    category: "Data Science",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Intermediate",
    language: "English",
    price: 99.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Python Fundamentals",
    description: "Master Python basics and data structures",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course2.id,
    resources: ["https://docs.python.org/3/tutorial/"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Data Analysis with Pandas",
    description: "Analyze data using pandas library",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 2,
    courseId: course2.id,
    resources: ["https://pandas.pydata.org/docs/"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 3,
    courseId: course2.id,
    resources: ["https://scikit-learn.org/stable/"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 3: UI/UX Design
  const course3 = courses.create({
    id: generateId(),
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    description: "Learn design principles, Figma, user research, wireframing, and prototyping. Create beautiful, user-centered designs.",
    category: "Design",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Beginner",
    language: "English",
    price: 79.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Design Principles",
    description: "Learn fundamental design principles",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course3.id,
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Figma Basics",
    description: "Master Figma for UI design",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 2,
    courseId: course3.id,
    resources: ["https://www.figma.com/"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 4: Mobile Development
  const course4 = courses.create({
    id: generateId(),
    title: "React Native Mobile App Development",
    slug: "react-native-mobile-app-development",
    description: "Build iOS and Android apps with React Native. Learn hooks, navigation, state management, and deployment.",
    category: "Mobile Development",
    thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Intermediate",
    language: "English",
    price: 94.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "React Native Setup",
    description: "Set up your development environment",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course4.id,
    resources: ["https://reactnative.dev/docs/environment-setup"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Building Your First App",
    description: "Create your first React Native application",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 2,
    courseId: course4.id,
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 5: Business
  const course5 = courses.create({
    id: generateId(),
    title: "Digital Marketing Strategy",
    slug: "digital-marketing-strategy",
    description: "Master SEO, social media marketing, content marketing, and analytics. Grow your business online.",
    category: "Business",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Beginner",
    language: "English",
    price: 69.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "SEO Fundamentals",
    description: "Learn search engine optimization",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course5.id,
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Course 6: Photography
  const course6 = courses.create({
    id: generateId(),
    title: "Photography Masterclass",
    slug: "photography-masterclass",
    description: "Learn professional photography techniques, composition, lighting, and editing. Capture stunning images.",
    category: "Photography",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
    introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty: "Beginner",
    language: "English",
    price: 59.99,
    published: true,
    instructorId: instructor1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  lessons.create({
    id: generateId(),
    title: "Camera Basics",
    description: "Understanding your camera settings",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
    courseId: course6.id,
    resources: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Create enrollments
  console.log("Creating enrollments...")
  enrollments.create({
    id: generateId(),
    studentId: student1.id,
    courseId: course1.id,
    progress: 33,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  enrollments.create({
    id: generateId(),
    studentId: student1.id,
    courseId: course2.id,
    progress: 66,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  enrollments.create({
    id: generateId(),
    studentId: student2.id,
    courseId: course3.id,
    progress: 100,
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // Create reviews
  console.log("Creating reviews...")
  reviews.create({
    id: generateId(),
    rating: 5,
    comment: "Amazing course! Very comprehensive and well-structured.",
    userId: student1.id,
    userName: student1.name,
    userImage: student1.image,
    courseId: course1.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  reviews.create({
    id: generateId(),
    rating: 4,
    comment: "Great content, but could use more examples.",
    userId: student2.id,
    userName: student2.name,
    userImage: student2.image,
    courseId: course3.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  reviews.create({
    id: generateId(),
    rating: 5,
    comment: "Best data science course I've taken!",
    userId: student1.id,
    userName: student1.name,
    userImage: student1.image,
    courseId: course2.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  console.log("✅ Seeding completed!")
  console.log("\nSample accounts:")
  console.log("Instructors:")
  console.log(`  - ${instructor1.name} (${instructor1.email}) / password123`)
  console.log(`  - ${instructor2.name} (${instructor2.email}) / password123`)
  console.log(`  - ${instructor3.name} (${instructor3.email}) / password123`)
  console.log("\nStudents:")
  console.log(`  - ${student1.email} / password123`)
  console.log(`  - ${student2.email} / password123`)
  console.log("\nCreated 6 courses with lessons, enrollments, and reviews!")
}

seed().catch((error) => {
  console.error("Error seeding:", error)
  process.exit(1)
})

