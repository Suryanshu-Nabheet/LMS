import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { lessonId, courseId } = await req.json()

    if (!lessonId || !courseId) {
      return NextResponse.json(
        { error: "Lesson ID and Course ID are required" },
        { status: 400 }
      )
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.user.id,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            lessons: true,
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      )
    }

    // Calculate progress based on lessons (simplified - in production, track individual lesson completion)
    const totalLessons = enrollment.course.lessons.length
    // For now, just increment progress by a fixed amount
    // In production, you'd track which specific lessons are completed

    const newProgress = Math.min(enrollment.progress + Math.floor(100 / totalLessons), 100)

    await prisma.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        progress: newProgress,
        completed: newProgress >= 100,
      },
    })

    return NextResponse.json({ success: true, progress: newProgress })
  } catch (error) {
    console.error("Lesson completion error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

