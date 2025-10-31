import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Sidebar } from "@/components/Sidebar"
import { CreateCourseForm } from "@/components/CreateCourseForm"

export default async function CreateCoursePage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "INSTRUCTOR") {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="INSTRUCTOR" />
      <div className="flex-1 p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Create New Course
        </h1>
        <CreateCourseForm />
      </div>
    </div>
  )
}

