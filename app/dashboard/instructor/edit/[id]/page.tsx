import { redirect, notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/layout/Sidebar"
import { EditCourseForm } from "@/components/courses/EditCourseForm"

async function getCourse(courseId: string, userId: string) {
  try {
    return await prisma.course.findFirst({
      where: {
        id: courseId,
        instructorId: userId,
      },
      include: {
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    })
  } catch (error) {
    console.error("Error fetching course for editing:", error)
    return null
  }
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "INSTRUCTOR") {
    redirect("/auth/login")
  }

  const { id } = await params
  const course = await getCourse(id, session.user.id)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="INSTRUCTOR" />
      <div className="flex-1 p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Edit Course
        </h1>
        <EditCourseForm course={course} />
      </div>
    </div>
  )
}

