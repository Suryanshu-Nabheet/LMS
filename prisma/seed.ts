import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create instructors
  const instructor1Password = await bcrypt.hash("password123", 10)
  const instructor1 = await prisma.user.upsert({
    where: { email: "instructor1@example.com" },
    update: {},
    create: {
      email: "instructor1@example.com",
      name: "John Instructor",
      password: instructor1Password,
      role: "INSTRUCTOR",
      image: "https://i.pravatar.cc/150?img=1",
    },
  })

  const instructor2Password = await bcrypt.hash("password123", 10)
  const instructor2 = await prisma.user.upsert({
    where: { email: "instructor2@example.com" },
    update: {},
    create: {
      email: "instructor2@example.com",
      name: "Sarah Teacher",
      password: instructor2Password,
      role: "INSTRUCTOR",
      image: "https://i.pravatar.cc/150?img=2",
    },
  })

  // Create students
  const student1Password = await bcrypt.hash("password123", 10)
  const student1 = await prisma.user.upsert({
    where: { email: "student1@example.com" },
    update: {},
    create: {
      email: "student1@example.com",
      name: "Alice Student",
      password: student1Password,
      role: "STUDENT",
      image: "https://i.pravatar.cc/150?img=3",
    },
  })

  const student2Password = await bcrypt.hash("password123", 10)
  const student2 = await prisma.user.upsert({
    where: { email: "student2@example.com" },
    update: {},
    create: {
      email: "student2@example.com",
      name: "Bob Learner",
      password: student2Password,
      role: "STUDENT",
      image: "https://i.pravatar.cc/150?img=4",
    },
  })

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { slug: "complete-web-development-bootcamp" },
    update: {},
    create: {
      title: "Complete Web Development Bootcamp",
      slug: "complete-web-development-bootcamp",
      description:
        "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career as a web developer.",
      category: "Development",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      difficulty: "Beginner",
      language: "English",
      price: 0,
      published: true,
      instructorId: instructor1.id,
      lessons: {
        create: [
          {
            title: "Introduction to Web Development",
            description: "Get started with web development basics",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 1,
            resources: ["https://example.com/resource1.pdf"],
          },
          {
            title: "HTML Fundamentals",
            description: "Learn HTML structure and tags",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 2,
            resources: [],
          },
          {
            title: "CSS Styling",
            description: "Master CSS for beautiful designs",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 3,
            resources: [],
          },
          {
            title: "JavaScript Basics",
            description: "Learn JavaScript programming",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 4,
            resources: [],
          },
        ],
      },
    },
  })

  const course2 = await prisma.course.upsert({
    where: { slug: "ui-ux-design-masterclass" },
    update: {},
    create: {
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      description:
        "Learn modern UI/UX design principles, tools, and techniques. Create stunning interfaces and improve user experiences. Perfect for beginners and intermediate designers.",
      category: "Design",
      thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      difficulty: "Intermediate",
      language: "English",
      price: 0,
      published: true,
      instructorId: instructor2.id,
      lessons: {
        create: [
          {
            title: "Introduction to UI/UX",
            description: "Understanding user interface and experience design",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 1,
            resources: [],
          },
          {
            title: "Design Principles",
            description: "Core principles of good design",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 2,
            resources: [],
          },
          {
            title: "Figma Basics",
            description: "Getting started with Figma",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 3,
            resources: [],
          },
        ],
      },
    },
  })

  const course3 = await prisma.course.upsert({
    where: { slug: "advanced-react-patterns" },
    update: {},
    create: {
      title: "Advanced React Patterns",
      slug: "advanced-react-patterns",
      description:
        "Dive deep into advanced React patterns, hooks, performance optimization, and best practices. Take your React skills to the next level.",
      category: "Development",
      thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      introVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      difficulty: "Advanced",
      language: "English",
      price: 0,
      published: true,
      instructorId: instructor1.id,
      lessons: {
        create: [
          {
            title: "React Hooks Deep Dive",
            description: "Master React hooks",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 1,
            resources: [],
          },
          {
            title: "Performance Optimization",
            description: "Optimize React applications",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 2,
            resources: [],
          },
        ],
      },
    },
  })

  // Create enrollments
  await prisma.enrollment.upsert({
    where: {
      studentId_courseId: {
        studentId: student1.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseId: course1.id,
      progress: 25,
    },
  })

  await prisma.enrollment.upsert({
    where: {
      studentId_courseId: {
        studentId: student1.id,
        courseId: course2.id,
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseId: course2.id,
      progress: 50,
    },
  })

  // Create reviews
  await prisma.review.upsert({
    where: {
      userId_courseId: {
        userId: student1.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      userId: student1.id,
      courseId: course1.id,
      rating: 5,
      comment: "Great course! Very well structured and easy to follow.",
      userName: student1.name,
      userImage: student1.image,
    },
  })

  console.log("Database seeded successfully!")
  console.log("\nSample accounts created:")
  console.log("Instructors:")
  console.log("  - instructor1@example.com / password123")
  console.log("  - instructor2@example.com / password123")
  console.log("Students:")
  console.log("  - student1@example.com / password123")
  console.log("  - student2@example.com / password123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

