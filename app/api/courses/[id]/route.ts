import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "INSTRUCTOR") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course || course.instructorId !== session.user.id) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 }
      )
    }

    const data = await req.json()
    const { lessons, published, ...courseData } = data

    // Update course
    const updateData: any = { ...courseData }
    if (published !== undefined) {
      updateData.published = published
    }

    // Update lessons if provided
    if (lessons && Array.isArray(lessons)) {
      updateData.lessons = lessons
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    })

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error("Course update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

