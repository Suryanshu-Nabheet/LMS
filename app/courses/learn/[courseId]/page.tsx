import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CoursePlayer } from "@/components/courses/CoursePlayer"

async function getCourse(courseId: string, userId: string) {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: userId,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
            instructor: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

      return (enrollment as any)?.course
  } catch (error) {
    console.error("Error fetching course for learning:", error)
    return null
  }
}

export default async function LearnCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>
  searchParams: Promise<{ lesson?: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const { courseId } = await params
  const { lesson } = await searchParams
  const course = await getCourse(courseId, session.user.id)

  if (!course) {
    notFound()
  }

  const lessonId = lesson || course.lessons[0]?.id
  const currentLesson = (course.lessons as any[]).find((l: any) => l.id === lessonId) || course.lessons[0]

  if (!currentLesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No lessons available in this course.</p>
      </div>
    )
  }

  return (
    <CoursePlayer
      course={course}
      currentLesson={currentLesson}
      allLessons={course.lessons}
    />
  )
}

